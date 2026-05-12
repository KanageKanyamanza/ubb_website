import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Team from "./pages/Team";
import Jobs from "./pages/Jobs";
import Ebooks from "./pages/Ebooks";
import Actualites from "./pages/Actualites";
import Register from "./pages/Register";

// Component to handle scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col font-sans selection:bg-gold/30 selection:text-gold-light">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/team" element={<Team />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/ebooks" element={<Ebooks />} />
            <Route path="/actualites" element={<Actualites />} />
            <Route path="/inscription" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

