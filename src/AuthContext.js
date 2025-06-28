import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, setPersistence, browserSessionPersistence, signOut } from "firebase/auth";
import { auth } from "./firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setPersistence(auth, browserSessionPersistence).then(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
      return () => unsubscribe();
    });
  }, []);

  const logout = () => signOut(auth); // ✅ Define logout

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ useAuth returns both user and logout
export const useAuth = () => useContext(AuthContext);
