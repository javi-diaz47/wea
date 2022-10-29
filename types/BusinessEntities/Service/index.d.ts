export interface Service {
  id?: string;
  name: string;
  resume?: string;
  description?: string;
  price?: string;
  tags?: Array<string>;
  owner_id: string;
  created_at?: string;
}
