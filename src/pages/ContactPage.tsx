import Layout from '@/components/Layout';
import AnimatedSection from '@/components/AnimatedSection';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage = () => {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-16">
            <AnimatedSection>
              <p className="text-accent text-sm tracking-widest uppercase mb-3">Contact</p>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-6">Parlons de votre projet</h1>
              <p className="text-muted-foreground mb-10">
                Nous sommes à votre écoute. Remplissez le formulaire ou contactez-nous directement.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Mail className="text-accent" size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">snowdenyves@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Phone className="text-accent" size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Téléphone</p>
                    <p className="text-sm text-muted-foreground">+33 1 23 45 67 89</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <MapPin className="text-accent" size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Adresse</p>
                    <p className="text-sm text-muted-foreground">Paris, France</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <form
                action="https://formsubmit.co/snowdenyves@gmail.com"
                method="POST"
                className="space-y-5 p-8 rounded-2xl border border-border bg-card"
              >
                <input type="hidden" name="_subject" value="Nouveau message — Talink Partners" />
                <input type="hidden" name="_captcha" value="false" />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Nom complet *</label>
                    <input id="name" name="name" required className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email *</label>
                    <input id="email" name="email" type="email" required className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Objet</label>
                  <input id="subject" name="subject" className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message *</label>
                  <textarea id="message" name="message" rows={5} required className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none" />
                </div>

                <button type="submit" className="btn-accent w-full justify-center">
                  Envoyer le message
                </button>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
