import { CreateOfferForm } from "Presentation/components/CreateOfferForm";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import { ProfileUserWithStar } from "Presentation/components/Profile/ProfileUserWithStar";
import { useCreateOffer } from "@/hooks/useCreateOffer";
import { supabase } from "Logic/utils/supabaseClient";
import { OfferMd } from "Presentation/components/OfferMd";
import { ConditionalBar } from "Presentation/components/ConditionalBar";
import { InputWithLabel } from "Presentation/components/InputWithLabel";
import { FormElementWithCounter } from "Presentation/components/FormElementWithCounter";
import { useState } from "react";
import { useBooleanState } from "@/hooks/useBooleanState";
import {
  MAX_OFFER_DESC_LENGTH,
  MAX_OFFER_RESUME_LENGTH,
} from "Logic/utils/constants";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getOfferById, mapOfferFromOfferCard } from "@/Persistence/OfferDAO";
import { useCreateReview } from "@/hooks/useCreateReview";

export default function EndJobOffer({ profileId, queryKey }) {
  const { data: offer } = useQuery(queryKey, getOfferById);
  const { inputValues, onHandleChange, onSave, onSuccess } = useCreateReview();
  return (
    <div className="flex flex-col gap-6 p-8">
      {onSuccess()}
      <ProfileUserWithStar
        href={`/profile/${offer.worker_id}`}
        name={offer.worker.name}
        last_name={offer.worker.last_name}
        star={offer.worker.calification}
      />

      <div className="flex flex-col gap-4 mt-4">
        <h2 className="text-4xl font-semibold">Finalizar oferta</h2>
        <form
          onSubmit={(ev) => onSave({ ev, offer })}
          className="grid gap-8 text-xl"
        >
          <InputWithLabel label="Calificar trabajador">
            <input
              name="calification"
              value={inputValues.calification}
              type="number"
              min="1"
              max="5"
              step="any"
              onChange={onHandleChange}
              className="text-lg w-full p-2 rounded-lg shadow-md"
              placeholder="Calificacion"
              required
            />
          </InputWithLabel>

          <FormElementWithCounter
            currentLength={inputValues.review?.length}
            maxLength={Number(MAX_OFFER_RESUME_LENGTH)}
          >
            <InputWithLabel label="Resumen">
              <textarea
                className="text-lg p-4 rounded-lg shadow-md"
                rows={4}
                name="review"
                value={inputValues.review}
                placeholder="Reseña al trabajador"
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
            Finalizar oferta
          </button>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params, req, res }) {
  const { id } = params;
  const queryClient = new QueryClient();

  const queryKey = ["offer", { id }];

  await queryClient.prefetchQuery(queryKey, getOfferById);

  const token = getCookie("token", { req, res });
  const profileId = jwt.decode(token).sub;

  return {
    props: {
      profileId,
      queryKey,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export async function getServerSidePaths() {
  const { data: offers, error } = await supabase.from("offers").select("id");

  return {
    paths: offers.map((offer) => ({
      params: {
        id: offer.id,
      },
    })),
    fallback: false,
  };
}
