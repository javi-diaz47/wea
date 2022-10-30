import { Offer } from "./BusinessEntities/Offer";
import { Profile } from "./BusinessEntities/Profile";
import { Service } from "./BusinessEntities/Service";

type notification_type = "offer" | "postulation" | "deny";

interface notification {
  id?: string;
  origin_id: Profile | string;
  destination_id: Profile | string;
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

export interface profileCard {
  name: string;
  last_name?: string;
  picture?: string;
}

export interface offerCard extends Offer {
  profile: profileCard;
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

export interface getAllOffersType {
  offers: Array<offerCard>;
  services: Array<offerCard>;
}
