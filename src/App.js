import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import UploadPage from "./UploadPage";
import AuthPage from "./AuthPage";
import HistoryPage from "./HistoryPage";
import Terms from "./Terms";
import Privacy from "./Privacy";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </Router>

  );
}

export default App;
