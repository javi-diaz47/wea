import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import { CreateOfferForm } from "@/components/CreateOfferForm";
import { useCreateOffer } from "@/hooks/useCreateOffer";
import { OfferMd } from "@/components/OfferMd";
import { useState } from "react";
import { ConditionalBar } from "@/components/ConditionalBar";

export default function createOffer({ profileId }) {
  const {
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
  } = useCreateOffer();

  return (
    <div className="flex flex-col gap-6 p-8">
      <ConditionalBar
        state={preview}
        stateTrueText="Vista previa"
        stateFalseText="Editar"
        onState={onPreview}
        onNotState={onEdit}
        className="flex flex-row-reverse justify-end"
        classNameBtnSelected="text-love"
        classNameBtn="text-black"
      />

      {!!preview && (
        <OfferMd
          name={inputValues.name}
          price={inputValues.price}
          tags={inputValues.tags}
          description={inputValues.description}
        />
      )}
      {!preview && (
        <div className=" max-w-6xl ">
          <h2 className="text-4xl font-semibold">Crear oferta</h2>
          <ConditionalBar
            state={isJobOffer}
            stateTrueText="Oferta de trabajo"
            stateFalseText="Servicio"
            onState={onJobOffer}
            onNotState={onServiceOffer}
            classNameBtnSelected="scale-95 active:shadow-lg text-white p-2 hover:bg-blue-500 bg-blue-600 bold duration-300 transition-all rounded-lg  mx-auto w-fit px-7 my-5 shadow-md"
            classNameBtn="active:scale-95 active:shadow-lg text-white p-2 hover:bg-blue-500 bg-blue-600 bold duration-300 transition-all rounded-lg  mx-auto w-fit px-7 my-5 shadow-md"
          />
          <CreateOfferForm
            name={inputValues.name}
            description={inputValues.description}
            resume={inputValues.resume}
            price={inputValues.price}
            tags={inputValues.tags}
            onHandleChange={onHandleChange}
            onHandleTags={onHandleTags}
            onSubmit={(ev) =>
              onSave({
                ev,
                owner_id: profileId,
                offer: inputValues,
              })
            }
          />
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  const token = getCookie("token", { req, res });

  return { props: { profileId: jwt.decode(token).sub } };
}
