import Layout from '@/components/Layout';
import AnimatedSection from '@/components/AnimatedSection';
import { ArrowRight, CheckCircle } from 'lucide-react';
import hero6 from '@/assets/hero-6.jpeg';

const services = [
  {
    title: 'Structuration RH',
    desc: 'Audit, organisation et mise en place de processus RH adaptés à votre taille et vos ambitions.',
    items: ['Audit organisationnel', 'Fiches de poste', 'Processus de recrutement', 'Onboarding'],
  },
  {
    title: 'Coaching & Bien-être',
    desc: 'Accompagnement individuel et collectif pour favoriser l\'épanouissement de vos collaborateurs.',
    items: ['Coaching managérial', 'Gestion du stress', 'Team building', 'QVT'],
  },
  {
    title: 'Expériences Collectives',
    desc: 'Ateliers et séminaires pour renforcer la cohésion et la culture d\'entreprise.',
    items: ['Séminaires', 'Ateliers créatifs', 'Formations inter-entreprises', 'Événements RH'],
  },
  {
    title: 'Digital RH',
    desc: 'Transformation digitale de vos processus RH pour plus d\'efficacité.',
    items: ['SIRH', 'Automatisation', 'Reporting RH', 'Marque employeur digitale'],
  },
];

const Entreprise = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img src={hero6} alt="Entreprise" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 h-full flex items-center">
          <div className="container-site">
            <AnimatedSection>
              <p className="text-accent text-sm tracking-widest uppercase mb-4">Entreprise</p>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 max-w-2xl">
                Choisissez votre point d'entrée, on s'occupe du reste
              </h1>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="/contact" className="btn-accent">
                    Demander un diagnostic
                  </a>
                  <a
                    href="/contact"
                    className="border border-white/30 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-white/10 transition-all inline-flex items-center gap-2"
                  >
                    Recevoir une proposition
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding">
        <div className="container-site">
          <AnimatedSection>
            <p className="text-accent text-sm tracking-widest uppercase mb-3">Nos services</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-14">Solutions pour les entreprises</h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="p-8 rounded-2xl border border-border bg-card hover:shadow-lg transition-all duration-300">
                  <h3 className="font-display text-xl font-semibold mb-3">{s.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{s.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {s.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm">
                        <CheckCircle size={16} className="text-accent flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/contact"
                    className="text-accent text-sm font-medium hover:underline inline-flex items-center gap-1"
                  >
                    Demander un devis <ArrowRight size={14} />
                  </a>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Entreprise;
