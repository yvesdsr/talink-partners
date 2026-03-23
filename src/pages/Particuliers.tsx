import Layout from '@/components/Layout';
import AnimatedSection from '@/components/AnimatedSection';
import { ArrowRight, Target, Rocket, GraduationCap, TrendingUp } from 'lucide-react';
import hero5 from '@/assets/hero-5.jpeg';

const programs = [
  {
    icon: <Target className="text-accent" size={24} />,
    title: 'Bilan de compétences',
    desc: 'Faites le point sur vos acquis et identifiez vos opportunités d\'évolution.',
  },
  {
    icon: <Rocket className="text-accent" size={24} />,
    title: 'Coaching carrière',
    desc: 'Accompagnement personnalisé pour définir et atteindre vos objectifs professionnels.',
  },
  {
    icon: <GraduationCap className="text-accent" size={24} />,
    title: 'Formations certifiantes',
    desc: 'IA, marketing digital, anglais professionnel — montez en compétences rapidement.',
  },
  {
    icon: <TrendingUp className="text-accent" size={24} />,
    title: 'Préparation entretien',
    desc: 'Coaching individuel pour maximiser vos chances lors des processus de recrutement.',
  },
];

const Particuliers = () => {
  return (
    <Layout>
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img src={hero5} alt="Particuliers" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 h-full flex items-center">
          <div className="container-site">
            <AnimatedSection>
              <p className="text-accent text-sm tracking-widest uppercase mb-4">Particuliers</p>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 max-w-2xl">
                Accélérez votre carrière avec méthode
              </h1>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://formsubmit.co/snowdenyves@gmail.com" className="btn-accent">
                  Réserver une séance
                </a>
                <a href="#parcours" className="border border-white/30 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-white/10 transition-all inline-flex items-center gap-2">
                  Voir les parcours <ArrowRight size={16} />
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section id="parcours" className="section-padding">
        <div className="container-site">
          <AnimatedSection>
            <p className="text-accent text-sm tracking-widest uppercase mb-3">Nos parcours</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-14">Programmes structurés</h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((p, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="p-8 rounded-2xl border border-border bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                    {p.icon}
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3">{p.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{p.desc}</p>
                  <a
                    href="https://formsubmit.co/snowdenyves@gmail.com"
                    className="text-accent text-sm font-medium hover:underline inline-flex items-center gap-1"
                  >
                    S'inscrire <ArrowRight size={14} />
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

export default Particuliers;
