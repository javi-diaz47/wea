import { Offer } from "./BusinessEntities/Offer";
import { Profile } from "./BusinessEntities/Profile";
import { Service } from "./BusinessEntities/Service";

type notification_type = "offer" | "postulation" | "deny";

export interface notification {
  id?: string;
  origin_id: string;
  destination_id: string;
  offer?: Offer;
  offer_id?: string;
  service_id?: string;
  viewed?: boolean;
  type?: notification_type;
  created_at?: string;
}

export interface notificationCard {
  id?: string;
  origin_id: string;
  destination_id: string;
  offer?: Offer;
  offer_id?: string;
  viewed?: boolean;
  type?: notification_type;
  created_at?: string;
  profile: profileCard;
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
  calification?: string;
  resume?: string;
}

export interface offerCard extends Offer {
  profile: profileCard;
  worker: profileCard;
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

export interface Review {
  id?: string;
  owner_id: string;
  worker_id: string;
  offer_id?: string;
  review: string;
  calification: string;
  created_at?: string;
}

export interface reviewCard extends Review {
  profile: profileCard;
  worker: profileCard;
}
