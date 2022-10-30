import { setOffer } from "@/Persistence/OfferDAO";
import { Offer } from "@/types/BusinessEntities/Offer";

const handleEndJobOffer = (offer: Offer) => {
  setOffer({ ...offer, in_progress: false });
};

export { handleEndJobOffer };
