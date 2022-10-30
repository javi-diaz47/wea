import { mapOfferFromOfferCard, setOffer } from "@/Persistence/OfferDAO";
import { setReview } from "@/Persistence/ReviewDAO";
import { offerCard, Review } from "@/types/types";

interface Props {
  review: Review;
  offerCard: offerCard;
}

const handleEndJobOffer = ({ review, offerCard }: Props) => {
  const offer = mapOfferFromOfferCard(offerCard);
  setOffer({ ...offer, in_progress: "done" });
  setReview({ ...review });
};

export { handleEndJobOffer };
