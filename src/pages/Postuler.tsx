import { useState } from 'react';
import Layout from '@/components/Layout';
import AnimatedSection from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Postuler = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    desired_position: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    additional_info: '',
  });
  const [cvFile, setCvFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let cv_file_url = '';

      if (cvFile) {
        const fileName = `spontaneous/${Date.now()}_${cvFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from('cv-uploads')
          .upload(fileName, cvFile);
        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('cv-uploads')
          .getPublicUrl(fileName);
        cv_file_url = urlData.publicUrl;
      }

      const { error } = await supabase.from('spontaneous_applications').insert({
        ...form,
        cv_file_url,
      });

      if (error) throw error;

      toast.success('Candidature spontanée envoyée !');
      setForm({ desired_position: '', first_name: '', last_name: '', email: '', phone: '', city: '', country: '', additional_info: '' });
      setCvFile(null);
    } catch (err: any) {
      toast.error(err.message || 'Erreur lors de l\'envoi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-site max-w-2xl">
          <AnimatedSection>
            <p className="text-accent text-sm tracking-widest uppercase mb-3">Candidature spontanée</p>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">Postuler chez Talink Partners</h1>
            <p className="text-muted-foreground mb-10">
              Aucune offre ne correspond à votre profil ? Envoyez-nous votre candidature spontanée.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-5 p-8 rounded-2xl border border-border bg-card">
              <div className="space-y-2">
                <Label htmlFor="desired_position">Poste souhaité *</Label>
                <Input id="desired_position" name="desired_position" value={form.desired_position} onChange={handleChange} required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">Prénom *</Label>
                  <Input id="first_name" name="first_name" value={form.first_name} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Nom *</Label>
                  <Input id="last_name" name="last_name" value={form.last_name} onChange={handleChange} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" name="phone" value={form.phone} onChange={handleChange} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Ville</Label>
                  <Input id="city" name="city" value={form.city} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Pays</Label>
                  <Input id="country" name="country" value={form.country} onChange={handleChange} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cv">CV (PDF)</Label>
                <Input id="cv" type="file" accept=".pdf,.doc,.docx" onChange={(e) => setCvFile(e.target.files?.[0] || null)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="additional_info">Informations supplémentaires</Label>
                <Textarea id="additional_info" name="additional_info" value={form.additional_info} onChange={handleChange} rows={4} />
              </div>

              <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={loading}>
                {loading ? 'Envoi en cours...' : 'Envoyer ma candidature'}
              </Button>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Postuler;
