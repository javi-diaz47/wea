export interface Offer {
  id?: string;
  name: string;
  resume?: string;
  description: string;
  tags?: Array<string>;
  price: string;
  calification?: number;
  owner_id: string;
  worker_id?: string;
  offer_type: string;
  in_progress: "in-progress" | "not-in-progress" | "done" | "";
  created_at?: string;
}
