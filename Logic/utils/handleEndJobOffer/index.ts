import { mapOfferFromOfferCard, setOffer } from "@/Persistence/OfferDAO";
import { setReview } from "@/Persistence/ReviewDAO";
import { offerCard, Review } from "@/types/types";

interface Props {
  review: Review;
  offerCard: offerCard;
}

const handleEndJobOffer = ({ review, offerCard }: Props) => {
  const offer = mapOfferFromOfferCard(offerCard);
  console.log(offer);
  setOffer({ ...offer, in_progress: "done" });
  const res = setReview({ ...review });
  return res;
};

export { handleEndJobOffer };
