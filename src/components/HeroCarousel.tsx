import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import hero1 from '@/assets/hero-1.jpeg';
import hero2 from '@/assets/hero-2.png';
import hero3 from '@/assets/hero-4.jpeg';

const slides = [
  {
    image: hero1,
    title: 'Votre partenaire RH de confiance',
    subtitle: 'Recrutement, formation et accompagnement sur mesure pour accélérer votre croissance.',
    cta: 'Découvrir nos services',
    ctaHref: '/entreprise',
  },
  {
    image: hero2,
    title: 'Des talents alignés à vos ambitions',
    subtitle: 'Nous identifions et plaçons les profils qui transformeront votre organisation.',
    cta: 'Voir nos offres',
    ctaHref: '/offres',
  },
  {
    image: hero3,
    title: 'Formez vos équipes pour demain',
    subtitle: 'IA, marketing digital, anglais professionnel — des formations concrètes et impactantes.',
    cta: 'En savoir plus',
    ctaHref: '/entreprise',
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full h-[85vh] min-h-[500px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-site">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-xl"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6">
                {slides[current].title}
              </h1>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                {slides[current].subtitle}
              </p>
              <a href={slides[current].ctaHref} className="btn-accent text-base">
                {slides[current].cta}
                <ChevronRight size={18} />
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all"
        aria-label="Diapositive précédente"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all"
        aria-label="Diapositive suivante"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === current ? 'bg-accent w-8' : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Diapositive ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
