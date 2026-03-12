import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";

// Public Component Imports
import PublicLayout from "./components/layout/PublicLayout";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ProjectsPage from "./pages/ProjectsPage";

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
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
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