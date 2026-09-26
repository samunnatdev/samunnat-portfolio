import { useEffect, useState, type ReactNode } from "react";
import { Link, Route, Switch, useLocation } from "wouter";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/project", label: "Project" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location]);

  return null;
}

function SiteLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="site-frame">
      <header className="site-header">
        <div className="site-header__inner">
          <Link href="/" className="brand-mark" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark__dot" />
            <span>ST<span className="brand-mark__slash">/</span></span>
          </Link>

          <nav className={`site-nav ${menuOpen ? "site-nav--open" : ""}`} aria-label="Primary navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`site-nav__link ${location === item.href ? "site-nav__link--active" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="site-header__actions">
            <a className="header-social" href="https://github.com/samunnatdev" target="_blank" rel="noreferrer" aria-label="Samunnat on GitHub">
              <Github size={17} strokeWidth={1.8} />
            </a>
            <button
              className="theme-toggle"
              type="button"
              onClick={() => toggleTheme?.()}
              aria-pressed={isDark}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun size={17} strokeWidth={1.8} /> : <Moon size={17} strokeWidth={1.8} />}
            </button>
            <Link href="/contact" className="header-cta">
              Let’s connect <ArrowUpRight size={15} strokeWidth={2} />
            </Link>
            <button className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((open) => !open)}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="site-footer__top">
          <div>
            <div className="footer-kicker">Have a question or an idea?</div>
            <a className="footer-email" href="mailto:samunnat.dev@gmail.com">samunnat.dev@gmail.com <ArrowUpRight size={22} /></a>
          </div>
          <div className="footer-links">
            <a href="https://github.com/samunnatdev" target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a>
            <a href="https://www.linkedin.com/in/samunnat-tuladhar-3528b0408/" target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a>
            <a href="mailto:samunnat.dev@gmail.com"><Mail size={16} /> Email</a>
          </div>
        </div>
        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} Samunnat Tuladhar</span>
          <span className="footer-note">Aspiring AI/ML Engineer · learning in public</span>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/project" component={Portfolio} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/experience" component={Experience} />
      <Route path="/contact" component={Contact} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <TooltipProvider>
          <Toaster />
          <ScrollToTop />
          <SiteLayout>
            <Router />
          </SiteLayout>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
