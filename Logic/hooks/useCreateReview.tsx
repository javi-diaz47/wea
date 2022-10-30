import { Modal } from "@/components/Modal";
import { setOffer } from "@/Persistence/OfferDAO";
import { setService } from "@/Persistence/ServiceDAO";
import { Offer } from "@/types/BusinessEntities/Offer";
import { Service } from "@/types/BusinessEntities/Service";
import { input_offer_type, notification, offerCard } from "@/types/types";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { handleEndJobOffer } from "Logic/utils/handleEndJobOffer";
import Router, { useRouter } from "next/router";
import { useState } from "react";
import { useBooleanState } from "./useBooleanState";
import { useModal } from "./useModal";

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
  const { modalOpen, open, close, renderModal } = useModal();
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  const onHandleChange = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = ev.target;
    const newInputValues = { ...inputValues, [name]: value };
    setInputValues(newInputValues);
  };

  const onSave = async ({ ev, offer }: onSaveProps) => {
    ev.preventDefault();
    const review = {
      ...inputValues,
      calification: String(inputValues.calification),
      owner_id: offer.owner_id,
      worker_id: offer.worker_id,
      offer_id: offer.id,
    };

    const res = handleEndJobOffer({
      review,
      offerCard: offer,
    });

    if (!res) {
      open();
      setSuccess(false);
      setTimeout(() => {
        router.back();
      }, 800);
    }

    if (!!res) {
      open();
      setSuccess(true);
    }
  };

  const onSuccess = () => {
    return renderModal({
      condition: modalOpen && success,
      modal: (
        <Modal
          title="Creacion exitosa"
          text=""
          handleClose={close}
          icon={<CheckCircleIcon className="w-12 h-12 text-green-500" />}
        />
      ),
    });
  };

  const onError = () => {
    return renderModal({
      condition: modalOpen && !success,
      modal: (
        <Modal
          title="Ha ocurrido un error con el servidor"
          text="Intenta nuevamente mas tarde"
          handleClose={close}
          icon={<CheckCircleIcon className="w-12 h-12 text-green-500" />}
        />
      ),
    });
  };

  return {
    inputValues,
    onHandleChange,
    onSave,
    onSuccess,
  };
};

export { useCreateReview };
