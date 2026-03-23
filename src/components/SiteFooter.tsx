import { Link } from 'react-router-dom';
import { Lock, Linkedin, Instagram, Mail } from 'lucide-react';
import { useState } from 'react';
import AdminLoginModal from './AdminLoginModal';

const SiteFooter = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <footer className="bg-foreground text-primary-foreground" role="contentinfo">
      <div className="container-site py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-bold">
              Talink<span className="text-accent">.</span>
            </h2>
            <p className="text-sm text-primary-foreground/60 leading-relaxed">
              Cabinet de conseil en Ressources Humaines. Recrutement, formation et accompagnement sur mesure.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-sm uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: 'Accueil', href: '/' },
                { name: 'Entreprise', href: '/entreprise' },
                { name: 'Particuliers', href: '/particuliers' },
                { name: 'Nos offres', href: '/offres' },
              ].map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-primary-foreground/60 hover:text-accent transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-sm uppercase tracking-wider">Liens utiles</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/a-propos" className="text-primary-foreground/60 hover:text-accent transition-colors">À propos</Link></li>
              <li><Link to="/contact" className="text-primary-foreground/60 hover:text-accent transition-colors">Contact</Link></li>
              <li><Link to="/postuler" className="text-primary-foreground/60 hover:text-accent transition-colors">Postuler</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-sm uppercase tracking-wider">Contact</h3>
            <p className="text-sm text-primary-foreground/60">snowdenyves@gmail.com</p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="mailto:snowdenyves@gmail.com" className="text-primary-foreground/60 hover:text-accent transition-colors" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex items-center justify-between">
          <p className="text-xs text-primary-foreground/40">
            © 2025 Talink Partners. Tous droits réservés.
          </p>
          <button
            onClick={() => setShowLogin(true)}
            className="text-primary-foreground/20 hover:text-primary-foreground/60 transition-colors p-2"
            aria-label="Accès administrateur"
          >
            <Lock size={14} />
          </button>
        </div>
      </div>

      <AdminLoginModal open={showLogin} onClose={() => setShowLogin(false)} />
    </footer>
  );
};

export default SiteFooter;
