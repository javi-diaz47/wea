import { setOffer } from "@/Persistence/OfferDAO";
import { setService } from "@/Persistence/ServiceDAO";
import { Offer } from "@/types/BusinessEntities/Offer";
import { Service } from "@/types/BusinessEntities/Service";
import { input_offer_type, notification } from "@/types/types";
import { useState } from "react";
import { useBooleanState } from "./useBooleanState";

export interface onSaveProps {
  ev: React.FormEvent<HTMLFormElement>;
  owner_id: string;
  worker_id?: string;
  offer: input_offer_type;
}

const INITIAL_STATE: input_offer_type = {
  name: "",
  resume: "",
  description: "",
  price: "",
  tags: [],
};

const useCreateOffer = () => {
  const [inputValues, setInputValues] = useState(INITIAL_STATE);
  const {
    bool: preview,
    onTrue: onPreview,
    onFalse: onEdit,
  } = useBooleanState(false);

  const {
    bool: isJobOffer,
    onTrue: onJobOffer,
    onFalse: onServiceOffer,
  } = useBooleanState(true);

  const onHandleChange = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = ev.target;
    const newInputValues = { ...inputValues, [name]: value };
    setInputValues(newInputValues);
  };

  const onHandleTags = (tags: Array<string>) => {
    const newInputValues = { ...inputValues, tags };
    setInputValues(newInputValues);
  };

  const onSave = async ({ ev, owner_id, worker_id, offer }: onSaveProps) => {
    ev.preventDefault();
    // console.log(owner_id);
    // console.log(profile_id);

    // Job offer
    if (isJobOffer && offer) {
      const newOffer: Offer = {
        ...offer,
        owner_id,
        worker_id,
        offer_type: worker_id ? "private" : "public",
        in_progress: "not-in-progress",
      };

      console.log(newOffer);

      const res = await setOffer(newOffer);
      // console.log(res);
    }

    // Service offer
    if (!isJobOffer && offer) {
      const newService: Service = {
        ...offer,
        owner_id,
      };

      console.log(newService);

      const res = await setService(newService);
      // console.log(res);
    }
  };

  const onPublish = () => {
    // Set public on supabase
  };

  return {
    inputValues,
    onHandleChange,
    onHandleTags,
    onSave,
    preview,
    onPreview,
    onEdit,
    isJobOffer,
    onJobOffer,
    onServiceOffer,
  };
};

export { useCreateOffer };
