export interface Offer {
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
  created_at: string;
}
