import { setOffer } from "@/Persistence/OfferDAO";
import { setService } from "@/Persistence/ServiceDAO";
import { Offer } from "@/types/BusinessEntities/Offer";
import { Service } from "@/types/BusinessEntities/Service";
import { input_offer_type, notification, offerCard } from "@/types/types";
import { handleEndJobOffer } from "Logic/utils/handleEndJobOffer";
import { useState } from "react";
import { useBooleanState } from "./useBooleanState";

interface onSaveProps {
  ev: React.FormEvent<HTMLFormElement>;
  offer: offerCard;
}

const INITIAL_STATE = {
  calification: "",
  review: "",
};

const useCreateReview = () => {
  const [inputValues, setInputValues] = useState(INITIAL_STATE);

  const onHandleChange = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = ev.target;
    const newInputValues = { ...inputValues, [name]: value };
    setInputValues(newInputValues);
  };

  const onSave = async ({ ev, offer }: onSaveProps) => {
    ev.preventDefault();
    console.log(offer);
    const review = {
      ...inputValues,
      owner_id: offer.owner_id,
      worker_id: offer.worker_id,
      offer_id: offer.id,
    };

    console.log(review);
    handleEndJobOffer({
      review,
      offerCard: offer,
    });
  };

  return {
    inputValues,
    onHandleChange,
    onSave,
  };
};

export { useCreateReview };
