import Layout from '@/components/Layout';
import AnimatedSection from '@/components/AnimatedSection';
import hero3 from '@/assets/hero-3.jpeg';
import hero8 from '@/assets/hero-8.jpeg';

const APropos = () => {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <p className="text-accent text-sm tracking-widest uppercase mb-3">À propos</p>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Qui sommes-nous ?
              </h1>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Talink Partners est un cabinet de conseil en ressources humaines fondé avec la conviction
                  que le capital humain est le levier de croissance le plus puissant pour toute organisation.
                </p>
                <p>
                  Notre équipe combine expertise RH, connaissance sectorielle et approche innovante pour
                  accompagner entreprises et particuliers dans leurs défis professionnels.
                </p>
                <p>
                  Du recrutement à la formation, en passant par le conseil stratégique, nous proposons
                  des solutions sur mesure adaptées à chaque contexte et chaque ambition.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative">
                <img src={hero3} alt="À propos de Talink Partners" className="rounded-2xl w-full aspect-[4/3] object-cover" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-2xl overflow-hidden border-4 border-background shadow-xl hidden lg:block">
                  <img src={hero8} alt="Notre équipe" className="w-full h-full object-cover" />
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Values */}
          <div className="mt-24">
            <AnimatedSection>
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-12 text-center">Nos valeurs</h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Excellence', desc: 'Nous visons l\'excellence dans chaque mission, avec rigueur et professionnalisme.' },
                { title: 'Proximité', desc: 'Un accompagnement humain et personnalisé, au plus près de vos besoins.' },
                { title: 'Innovation', desc: 'Des méthodes modernes et des outils innovants pour des résultats durables.' },
              ].map((v, i) => (
                <AnimatedSection key={i} delay={i * 0.15}>
                  <div className="text-center p-8">
                    <h3 className="font-display text-xl font-semibold mb-3">{v.title}</h3>
                    <p className="text-muted-foreground text-sm">{v.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default APropos;
