import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Team from "./pages/Team";
import Founder from "./pages/Founder";
import Jobs from "./pages/Jobs";
import Ebooks from "./pages/Ebooks";
import Actualites from "./pages/Actualites";
import Register from "./pages/Register";
import Workbook from "./pages/Workbook";
import Postuler from "./pages/Postuler";
import Contact from "./pages/Contact";

// Admin Imports
import { AuthProvider } from "./context/AuthContext";
import { NewsProvider } from "./context/NewsContext";
import { TeamProvider } from "./context/TeamContext";
import { ResourcesProvider } from "./context/ResourcesContext";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { LanguageProvider } from "./context/LanguageContext";

// Component to handle scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

import { Link } from "react-router-dom";
import ChatWidget from "./components/chatbot/ChatWidget";
import VitalCheckPopup from "./components/VitalCheckPopup";

// Layout wrapper to conditionally show/hide Navbar and Footer
function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col font-sans selection:bg-gold/30 selection:text-gold-light">
      {!isAdminPage && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!isAdminPage && (
        <>
          <Footer />
          <div className="bg-bg-primary py-4 text-center border-t border-border-subtle/30">
            <Link to="/admin/login" className="text-[10px] text-text-muted hover:text-gold transition-colors tracking-widest uppercase">Admin</Link>
          </div>
          <ChatWidget />
          <VitalCheckPopup />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <NewsProvider>
          <TeamProvider>
            <ResourcesProvider>
              <Router>
                <ScrollToTop />
                <AppLayout>
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/founder" element={<Founder />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/ebooks" element={<Ebooks />} />
                    <Route path="/actualites" element={<Actualites />} />
                    <Route path="/inscription" element={<Register />} />
                    <Route path="/workbook" element={<Workbook />} />
                    <Route path="/postuler" element={<Postuler />} />
                    <Route path="/contact" element={<Contact />} />

                    {/* Admin Routes */}
                    <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin/dashboard" element={
                      <ProtectedRoute>
                        <AdminDashboard />
                      </ProtectedRoute>
                    } />
                  </Routes>
                </AppLayout>
              </Router>
            </ResourcesProvider>
          </TeamProvider>
        </NewsProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}


