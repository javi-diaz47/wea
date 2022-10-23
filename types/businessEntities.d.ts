interface Profile {
  id: string;
  name: string;
  last_name: string;
  email: string;
  resume: string;
  who_am_i: string;
  calification: number;
  picture?: string;
  inserted_at: string;
  updated_at: string;
  contact_me: string;
}

interface Offer {
  id: string;
  name: string;
  resume: string;
  description: string;
  tags?: string;
  price: string;
  calification: number;
  owner_id: string;
  worker_id?: string;
  offer_type: string;
  in_progress: boolean;
  inserted_at: string;
}

interface Service {
  id: string;
  name: string;
  resume: string;
  description: string;
  tags?: string;
  author_id: string;
  created_at: string;
}
