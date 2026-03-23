import Layout from '@/components/Layout';
import HeroCarousel from '@/components/HeroCarousel';
import AnimatedSection from '@/components/AnimatedSection';
import { ArrowRight, Users, BookOpen, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import hero7 from '@/assets/hero-7.jpeg';
import hero8 from '@/assets/hero-8.jpeg';

const services = [
  {
    icon: <Briefcase className="text-accent" size={28} />,
    title: 'Recrutement & Placement',
    desc: 'Identification et placement de talents alignés à votre culture et vos objectifs stratégiques.',
  },
  {
    icon: <BookOpen className="text-accent" size={28} />,
    title: 'Formation',
    desc: 'Programmes en IA, marketing digital et anglais professionnel pour renforcer vos équipes.',
  },
  {
    icon: <Users className="text-accent" size={28} />,
    title: 'Conseil RH',
    desc: 'Structuration RH, coaching, bien-être au travail et transformation digitale.',
  },
];

const Index = () => {
  return (
    <Layout>
      <HeroCarousel />

      {/* Services */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <AnimatedSection>
            <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">Ce que nous faisons</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Nos expertises</h2>
            <p className="text-muted-foreground max-w-xl mb-14">
              Un accompagnement complet pour répondre à vos enjeux RH, du recrutement à la transformation digitale.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className="p-8 rounded-2xl border border-border bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                    {s.icon}
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="section-padding bg-secondary">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="relative">
                <img src={hero7} alt="Équipe Talink Partners" className="rounded-2xl object-cover w-full aspect-[4/3]" />
                <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-2xl overflow-hidden border-4 border-background shadow-xl hidden lg:block">
                  <img src={hero8} alt="Collaboration" className="w-full h-full object-cover" />
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">À propos</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Une approche humaine et stratégique
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Talink Partners accompagne les entreprises et les particuliers dans leurs enjeux RH avec une approche sur mesure, centrée sur l'humain et la performance.
              </p>
              <Link to="/a-propos" className="btn-outline-dark">
                En savoir plus
                <ArrowRight size={16} />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-foreground text-primary-foreground">
        <div className="container-site text-center">
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Prêt à transformer vos ressources humaines ?
            </h2>
            <p className="text-primary-foreground/60 max-w-lg mx-auto mb-10">
              Contactez-nous pour un diagnostic gratuit et découvrez comment nous pouvons accompagner votre croissance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-accent text-base">
                Nous contacter
              </Link>
              <Link to="/offres" className="border border-primary-foreground/30 text-primary-foreground px-6 py-3 rounded-lg font-medium text-sm hover:bg-primary-foreground/10 transition-all inline-flex items-center justify-center gap-2">
                Voir nos offres
                <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Ad placeholder */}
      <div className="container-site py-8">
        <div className="w-full h-24 bg-muted rounded-xl flex items-center justify-center text-muted-foreground text-xs">
          Espace publicitaire
        </div>
      </div>
    </Layout>
  );
};

export default Index;
