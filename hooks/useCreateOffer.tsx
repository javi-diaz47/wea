import { setOffer } from "@/fetchData/OfferDAO";
import { Offer } from "@/types/BusinessEntities/Offer";
import { input_offer_type } from "@/types/types";
import { useState } from "react";

interface onSaveProps {
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

    const newOffer: Offer = {
      ...offer,
      owner_id: owner_id,
      worker_id,
      offer_type: worker_id ? "private" : "public",
      in_progress: false,
    };

    console.log(newOffer);

    const res = setOffer(newOffer);
    // console.log(res);
  };

  const onPublish = () => {
    // Set public on supabase
  };

  const [preview, setPreview] = useState(false);

  const onPreview = () => {
    setPreview(true);
  };
  const onEdit = () => {
    setPreview(false);
  };

  return {
    inputValues,
    onHandleChange,
    onHandleTags,
    onSave,
    preview,
    onPreview,
    onEdit,
  };
};

export { useCreateOffer };
