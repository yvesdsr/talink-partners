import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Accueil', href: '/' },
  { name: 'Entreprise', href: '/entreprise' },
  { name: 'Particuliers', href: '/particuliers' },
  { name: 'Nos offres', href: '/offres' },
  { name: 'À propos', href: '/a-propos' },
  { name: 'Contact', href: '/contact' },
  { name: 'Postuler', href: '/postuler' },
];

const SideNav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Desktop / Tablet — vertical left nav */}
      <nav className="hidden md:flex fixed left-0 top-0 bottom-0 w-20 lg:w-64 bg-sidebar z-50 flex-col items-center lg:items-start py-8 px-4 lg:px-6 border-r border-sidebar-border">
        <Link to="/" className="mb-12">
          <span className="text-sidebar-foreground font-display text-xl lg:text-2xl font-bold tracking-tight">
            <span className="lg:hidden">TP</span>
            <span className="hidden lg:inline">Talink<span className="text-accent">.</span></span>
          </span>
        </Link>

        <div className="flex flex-col gap-1 w-full flex-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`relative px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 group
                  ${isActive
                    ? 'text-accent bg-sidebar-accent'
                    : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
                  }`}
              >
                <span className="hidden lg:inline">{item.name}</span>
                <span className="lg:hidden text-xs text-center block">{item.name.slice(0, 3)}</span>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-accent rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="text-sidebar-foreground/40 text-xs hidden lg:block">
          © 2025 Talink Partners
        </div>
      </nav>

      {/* Mobile — top bar + burger */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-sidebar z-50 flex items-center justify-between px-5 border-b border-sidebar-border">
        <Link to="/">
          <span className="text-sidebar-foreground font-display text-xl font-bold">
            Talink<span className="text-accent">.</span>
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-sidebar-foreground p-2"
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-sidebar z-50 md:hidden flex flex-col py-8 px-6"
            >
              <div className="flex justify-between items-center mb-10">
                <span className="text-sidebar-foreground font-display text-xl font-bold">
                  Talink<span className="text-accent">.</span>
                </span>
                <button onClick={() => setMobileOpen(false)} className="text-sidebar-foreground">
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`px-4 py-3 rounded-md text-base font-medium transition-all duration-200
                        ${isActive
                          ? 'text-accent bg-sidebar-accent'
                          : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
                        }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SideNav;
