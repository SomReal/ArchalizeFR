import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import UploadPage from "./UploadPage";
import AuthPage from "./AuthPage";
import HistoryPage from "./HistoryPage";
import Terms from "./Terms";
import Privacy from "./Privacy";
import FloorPlanPage from "./FloorPlanPage";
import Footer from "./Footer";
import Samples from "./Samples";




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
        <Route path="/floorplan" element={<FloorPlanPage />} />
        <Route path="/samples" element={<Samples />} />
      </Routes>
      <Footer />
    </Router>

  );
}

export default App;
