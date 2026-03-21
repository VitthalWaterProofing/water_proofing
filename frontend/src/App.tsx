import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";

// Public Component Imports
import PublicLayout from "./components/layout/PublicLayout";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ProjectsPage from "./pages/ProjectsPage";
import FeedbackPage from "./pages/FeedbackPage";

// Admin Component Imports
import Login from "./pages/admin/Login";
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import LeadsList from "./pages/admin/LeadsList";
import ServicesManagement from "./pages/admin/ServicesManagement";
import ProjectsManagement from "./pages/admin/ProjectsManagement";
import TestimonialsManagement from "./pages/admin/TestimonialsManagement";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's no hash, just scroll to the top of the new page
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    // Function to handle the actual scrolling logic
    const scrollToHash = () => {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "instant" });
        return true; // Found and scrolled
      }
      return false; // Not found yet
    };

    // 1. Try scrolling immediately (if the page was already loaded)
    let found = scrollToHash();

    // 2. If it's a cross-page navigation, the element might not exist yet 
    // or images/API requests might push it down later. 
    // We use a few staggered timeouts to catch late renders.
    if (!found) {
      setTimeout(() => { if (!found) found = scrollToHash(); }, 100);
      setTimeout(() => { if (!found) found = scrollToHash(); }, 500);
      setTimeout(() => { if (!found) found = scrollToHash(); }, 1500); // Failsafe for slow connections
    }

  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      
      <Routes>
        {/* Public Website Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
        </Route>

        {/* Admin Public Route (Login) */}
        <Route path="/admin/login" element={<Login />} />

        {/* Admin Secure Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/leads" element={<LeadsList />} />
            <Route path="/admin/services" element={<ServicesManagement />} />
            <Route path="/admin/projects" element={<ProjectsManagement />} />
            <Route path="/admin/testimonials" element={<TestimonialsManagement />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;