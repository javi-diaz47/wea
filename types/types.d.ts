import { Offer } from "./BusinessEntities/Offer";
import { Service } from "./BusinessEntities/Service";

type notification_type = "offer" | "postulation" | "deny";

interface notification {
  id?: string;
  origin_id: Profile;
  destination_id: Profile;
  offer?: Offer;
  offer_id?: string;
  viewed?: boolean;
  type?: notification_type;
  created_at?: string;
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

export interface offerCard extends Offer {
  profile: {
    name: string;
    last_name?: string;
    picture?: string;
  };
}

export interface serviceCard extends Service {
  profile: {
    name: string;
    last_name?: string;
    picture?: string;
  };
}

export interface OfferNotification {
  offer: Offer;
  origin_id: Profile;
  destination_id: string;
  notification_id: string;
}
