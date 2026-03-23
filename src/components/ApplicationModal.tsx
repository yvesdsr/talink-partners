import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Props {
  open: boolean;
  onClose: () => void;
  jobId?: string;
  jobTitle?: string;
}

const ApplicationModal = ({ open, onClose, jobId, jobTitle }: Props) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
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
        const fileName = `${Date.now()}_${cvFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from('cv-uploads')
          .upload(fileName, cvFile);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('cv-uploads')
          .getPublicUrl(fileName);
        cv_file_url = urlData.publicUrl;
      }

      const { error } = await supabase.from('applications').insert({
        job_id: jobId,
        ...form,
        cv_file_url,
      });

      if (error) throw error;

      toast.success('Candidature envoyée avec succès !');
      onClose();
      setForm({ first_name: '', last_name: '', email: '', phone: '', city: '', country: '', additional_info: '' });
      setCvFile(null);
    } catch (err: any) {
      toast.error(err.message || 'Erreur lors de l\'envoi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display">
            {jobTitle ? `Postuler — ${jobTitle}` : 'Candidature'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
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
            <Input
              id="cv"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setCvFile(e.target.files?.[0] || null)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additional_info">Informations supplémentaires</Label>
            <Textarea id="additional_info" name="additional_info" value={form.additional_info} onChange={handleChange} rows={3} />
          </div>

          <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={loading}>
            {loading ? 'Envoi en cours...' : 'Envoyer ma candidature'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationModal;
