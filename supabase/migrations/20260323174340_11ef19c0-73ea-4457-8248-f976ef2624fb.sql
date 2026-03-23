-- Create job_offers table
CREATE TABLE public.job_offers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  location TEXT NOT NULL DEFAULT '',
  share_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.job_offers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view job offers"
  ON public.job_offers FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert job offers"
  ON public.job_offers FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update job offers"
  ON public.job_offers FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete job offers"
  ON public.job_offers FOR DELETE
  TO authenticated
  USING (true);

-- Create applications table
CREATE TABLE public.applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID REFERENCES public.job_offers(id) ON DELETE SET NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  city TEXT,
  country TEXT,
  cv_file_url TEXT,
  additional_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert applications"
  ON public.applications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view applications"
  ON public.applications FOR SELECT
  TO authenticated
  USING (true);

-- Create spontaneous_applications table
CREATE TABLE public.spontaneous_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  desired_position TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  city TEXT,
  country TEXT,
  cv_file_url TEXT,
  additional_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.spontaneous_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert spontaneous applications"
  ON public.spontaneous_applications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view spontaneous applications"
  ON public.spontaneous_applications FOR SELECT
  TO authenticated
  USING (true);

-- Create posts table
CREATE TABLE public.posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view posts"
  ON public.posts FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage posts"
  ON public.posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update posts"
  ON public.posts FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete posts"
  ON public.posts FOR DELETE
  TO authenticated
  USING (true);

-- Create storage bucket for CV uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('cv-uploads', 'cv-uploads', true);

CREATE POLICY "Anyone can upload CVs"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'cv-uploads');

CREATE POLICY "Anyone can read CVs"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'cv-uploads');