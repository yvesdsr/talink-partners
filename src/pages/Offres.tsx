import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import AnimatedSection from '@/components/AnimatedSection';
import { MapPin, Clock, Share2, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import ApplicationModal from '@/components/ApplicationModal';
import { toast } from 'sonner';

interface JobOffer {
  id: string;
  title: string;
  description: string;
  location: string;
  created_at: string;
  share_link: string | null;
}

const Offres = () => {
  const [offers, setOffers] = useState<JobOffer[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobOffer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      const { data, error } = await supabase
        .from('job_offers')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) setOffers(data);
      setLoading(false);
    };
    fetchOffers();
  }, []);

  const shareOffer = (offer: JobOffer) => {
    const url = `${window.location.origin}/offres?job=${offer.id}`;
    navigator.clipboard.writeText(url);
    toast.success('Lien copié dans le presse-papiers !');
  };

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-site">
          <AnimatedSection>
            <p className="text-accent text-sm tracking-widest uppercase mb-3">Carrières</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Nos offres d'emploi</h2>
            <p className="text-muted-foreground max-w-xl mb-14">
              Découvrez les opportunités disponibles et rejoignez une équipe ambitieuse.
            </p>
          </AnimatedSection>

          {loading ? (
            <div className="text-center py-20 text-muted-foreground">Chargement...</div>
          ) : offers.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">Aucune offre disponible pour le moment.</p>
              <a href="/postuler" className="btn-accent">Candidature spontanée</a>
            </div>
          ) : (
            <div className="space-y-6">
              {offers.map((offer, i) => (
                <AnimatedSection key={offer.id} delay={i * 0.1}>
                  <div className="p-8 rounded-2xl border border-border bg-card hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex-1">
                        <h3 className="font-display text-xl font-semibold mb-2">{offer.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{offer.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><MapPin size={14} /> {offer.location}</span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {new Date(offer.created_at).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-3 flex-shrink-0">
                        <Button variant="outline" size="sm" onClick={() => shareOffer(offer)}>
                          <Share2 size={14} className="mr-1" /> Partager
                        </Button>
                        <Button
                          size="sm"
                          className="bg-accent hover:bg-accent/90"
                          onClick={() => setSelectedJob(offer)}
                        >
                          Postuler <ArrowRight size={14} className="ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      <ApplicationModal
        open={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        jobId={selectedJob?.id}
        jobTitle={selectedJob?.title}
      />
    </Layout>
  );
};

export default Offres;
