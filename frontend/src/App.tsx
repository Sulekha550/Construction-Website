
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/common/Footer";
import WhatsAppFloat from "./components/common/WhatsAppFloat";
import RouteChange from "./components/common/RouteChange";
import PageTransition from "./components/common/PageTransition";

import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Project";
import FloorPlans from "./pages/FloorPlans";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";



function PublicLayout() {
  return (
    <>
      <Navbar />

      <main className="relative overflow-x-hidden">
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:id" element={<Portfolio />} />
            <Route path="/projects/:id" element={<Portfolio />} />

            <Route
              path="/projects"
              element={<Navigate to="/portfolio" replace />}
            />

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
    </>
  );
}

function AdminLayout() {
  return (
    <Routes>
    

      {/* Real MongoDB project management page */}
     

      

     

      <Route
        path="*"
        element={<Navigate to="/admin/dashboard" replace />}
      />
    </Routes>
  );
}

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <RouteChange />

      {isAdminRoute ? <AdminLayout /> : <PublicLayout />}
    </div>
  );
}
