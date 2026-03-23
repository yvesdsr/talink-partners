import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { LogOut, Plus, Trash2, Download, ExternalLink } from 'lucide-react';

const Admin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [offers, setOffers] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [spontaneous, setSpontaneous] = useState<any[]>([]);
  const [newOffer, setNewOffer] = useState({ title: '', description: '', location: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate('/');
      else setUser(session.user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate('/');
      else setUser(session.user);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchOffers();
      fetchApplications();
      fetchSpontaneous();
    }
  }, [user]);

  const fetchOffers = async () => {
    const { data } = await supabase.from('job_offers').select('*').order('created_at', { ascending: false });
    if (data) setOffers(data);
  };

  const fetchApplications = async () => {
    const { data } = await supabase.from('applications').select('*').order('created_at', { ascending: false });
    if (data) setApplications(data);
  };

  const fetchSpontaneous = async () => {
    const { data } = await supabase.from('spontaneous_applications').select('*').order('created_at', { ascending: false });
    if (data) setSpontaneous(data);
  };

  const createOffer = async () => {
    if (!newOffer.title) return;
    setLoading(true);
    const share_link = `${window.location.origin}/offres?job=new`;
    const { error } = await supabase.from('job_offers').insert({ ...newOffer, share_link });
    if (error) toast.error(error.message);
    else {
      toast.success('Offre créée');
      setNewOffer({ title: '', description: '', location: '' });
      fetchOffers();
    }
    setLoading(false);
  };

  const deleteOffer = async (id: string) => {
    const { error } = await supabase.from('job_offers').delete().eq('id', id);
    if (!error) {
      toast.success('Offre supprimée');
      fetchOffers();
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background z-30">
        <div className="container-site flex items-center justify-between h-16">
          <h1 className="font-display text-xl font-bold">Administration</h1>
          <Button variant="outline" size="sm" onClick={logout}>
            <LogOut size={14} className="mr-1" /> Déconnexion
          </Button>
        </div>
      </header>

      <div className="container-site py-8">
        <Tabs defaultValue="offers">
          <TabsList className="mb-8">
            <TabsTrigger value="offers">Offres ({offers.length})</TabsTrigger>
            <TabsTrigger value="applications">Candidatures ({applications.length})</TabsTrigger>
            <TabsTrigger value="spontaneous">Spontanées ({spontaneous.length})</TabsTrigger>
          </TabsList>

          {/* Job offers tab */}
          <TabsContent value="offers" className="space-y-6">
            <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
              <h3 className="font-display text-lg font-semibold">Nouvelle offre</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <Label>Titre</Label>
                  <Input value={newOffer.title} onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <Label>Localisation</Label>
                  <Input value={newOffer.location} onChange={(e) => setNewOffer({ ...newOffer, location: e.target.value })} />
                </div>
                <div className="flex items-end">
                  <Button onClick={createOffer} disabled={loading} className="bg-accent hover:bg-accent/90">
                    <Plus size={14} className="mr-1" /> Créer
                  </Button>
                </div>
              </div>
              <div className="space-y-1">
                <Label>Description</Label>
                <Textarea value={newOffer.description} onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })} rows={3} />
              </div>
            </div>

            {offers.map((offer) => (
              <div key={offer.id} className="p-6 rounded-xl border border-border flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{offer.title}</h4>
                  <p className="text-sm text-muted-foreground">{offer.location} — {new Date(offer.created_at).toLocaleDateString('fr-FR')}</p>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{offer.description}</p>
                </div>
                <Button variant="destructive" size="sm" onClick={() => deleteOffer(offer.id)}>
                  <Trash2 size={14} />
                </Button>
              </div>
            ))}
          </TabsContent>

          {/* Applications tab */}
          <TabsContent value="applications">
            <div className="space-y-4">
              {applications.length === 0 && <p className="text-muted-foreground text-center py-10">Aucune candidature</p>}
              {applications.map((app) => (
                <div key={app.id} className="p-6 rounded-xl border border-border">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{app.first_name} {app.last_name}</h4>
                      <p className="text-sm text-muted-foreground">{app.email} — {app.phone}</p>
                      <p className="text-sm text-muted-foreground">{app.city}, {app.country}</p>
                      {app.additional_info && <p className="text-sm mt-2">{app.additional_info}</p>}
                    </div>
                    {app.cv_file_url && (
                      <a href={app.cv_file_url} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm"><Download size={14} className="mr-1" /> CV</Button>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Spontaneous tab */}
          <TabsContent value="spontaneous">
            <div className="space-y-4">
              {spontaneous.length === 0 && <p className="text-muted-foreground text-center py-10">Aucune candidature spontanée</p>}
              {spontaneous.map((app) => (
                <div key={app.id} className="p-6 rounded-xl border border-border">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-accent font-medium mb-1">Poste souhaité : {app.desired_position}</p>
                      <h4 className="font-semibold">{app.first_name} {app.last_name}</h4>
                      <p className="text-sm text-muted-foreground">{app.email} — {app.phone}</p>
                      <p className="text-sm text-muted-foreground">{app.city}, {app.country}</p>
                    </div>
                    {app.cv_file_url && (
                      <a href={app.cv_file_url} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm"><Download size={14} className="mr-1" /> CV</Button>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
