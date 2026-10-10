import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/common/Footer";
import WhatsAppFloat from "./components/common/WhatsAppFloat";
import RouteChange from "./components/common/RouteChange";
import PageTransition from "./components/common/PageTransition";

import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Project";
import ProjectDetails from "./pages/ProjectDetails";
import FloorPlans from "./pages/FloorPlans";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <RouteChange />
      <Navbar />

      <main className="relative overflow-hidden">
        <PageTransition>
        <Routes>
          {/* Primary pages */}
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />

          {/* Individual project pages open in full screen view */}
          <Route path="/portfolio/:id" element={<Portfolio />} />
          <Route path="/projects/:id" element={<Portfolio />} />

          {/* Backwards-compatible project URLs */}
          <Route path="/projects" element={<Navigate to="/portfolio" replace />} />

          {/* Supporting pages */}
          <Route path="/about" element={<About />} />
          <Route path="/floor-plans" element={<FloorPlans />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PageTransition>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
