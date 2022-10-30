import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import { CreateOfferForm } from "Presentation/components/CreateOfferForm";
import { useCreateOffer } from "@/hooks/useCreateOffer";
import { OfferMd } from "Presentation/components/OfferMd";
import { useState } from "react";
import { ConditionalBar } from "Presentation/components/ConditionalBar";
import { useModal } from "@/hooks/useModal";
import { FormElementWithCounter } from "@/components/FormElementWithCounter";
import { InputWithLabel } from "@/components/InputWithLabel";
import {
  MAX_OFFER_DESC_LENGTH,
  MAX_OFFER_RESUME_LENGTH,
} from "@/utils/constants";
import { setProfile } from "@/Persistence/UserDAO";
import { Modal } from "@/components/Modal";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/outline";

export default function createOffer({ profileId }) {
  const [inputValues, setInputValues] = useState({
    resume: "",
    who_am_i: "",
  });

  const onHandleChange = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = ev.target;
    const newInputValues = { ...inputValues, [name]: value };
    setInputValues(newInputValues);
  };

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const res = setProfile({
      id: profileId,
      ...inputValues,
    });

    if (res) {
      open();
    }

    if (!res) {
      close();
    }
  };

  const { close, modalOpen, open, renderModal } = useModal();

  return (
    <div className="flex flex-col gap-6 p-8">
      {renderModal({
        condition: modalOpen,
        modal: (
          <Modal
            title="Guardado"
            text=""
            handleClose={close}
            icon={<CheckCircleIcon className="w-12 h-12 text-green-500" />}
          />
        ),
      })}
      <div className=" max-w-6xl flex flex-col gap-4 ">
        <h2 className="text-4xl font-semibold">Editar Perfil</h2>
        <form onSubmit={onSubmit} className="grid gap-8 text-xl">
          <FormElementWithCounter
            currentLength={inputValues.who_am_i?.length}
            maxLength={Number(MAX_OFFER_RESUME_LENGTH)}
          >
            <InputWithLabel label="¿Quién soy?">
              <textarea
                className="text-lg p-4 rounded-lg shadow-md"
                rows={2}
                name="who_am_i"
                value={inputValues.who_am_i}
                placeholder="Escribe aqui la descripciond de tu oferta..."
                onChange={onHandleChange}
                maxLength={Number(MAX_OFFER_DESC_LENGTH)}
                required
              />
            </InputWithLabel>
          </FormElementWithCounter>

          <FormElementWithCounter
            currentLength={inputValues.resume?.length}
            maxLength={Number(MAX_OFFER_RESUME_LENGTH)}
          >
            <InputWithLabel label="Resumen">
              <textarea
                className="text-lg p-4 rounded-lg shadow-md"
                rows={4}
                name="resume"
                value={inputValues.resume}
                placeholder="Escribe aqui la descripciond de tu oferta..."
                onChange={onHandleChange}
                maxLength={Number(MAX_OFFER_DESC_LENGTH)}
                required
              />
            </InputWithLabel>
          </FormElementWithCounter>
          <button
            className="text-white hover:bg-white hover:text-blue-600 m-w-24 p-2 font-bold bg-blue-600 rounded-lg"
            type="submit"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  const token = getCookie("token", { req, res });

  return { props: { profileId: jwt.decode(token).sub } };
}
