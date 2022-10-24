type notification_type = "offer" | "postulation";

interface notification {
  id: string;
  name: string;
  resume: string;
  description: string;
  tags?: string;
  origin_id: string;
  destination_id: string;
  offer_id: string;
  viewed: boolean;
  type: notification_type;
  created_at: string;
}

// export interface Profiles {
//   profiles: Array<Profile>;
// }

export type input_offer_type = {
  name: string;
  resume: string;
  description: string;
  price: string;
  tags: Array<string>;
  // tags?: [string?, string?, string?, string?];
};
