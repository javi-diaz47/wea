import { getDateFormat } from "Logic/utils/getDateFormat";
import { supabase } from "Logic/utils/supabaseClient";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getOfferById } from "Persistence/OfferDAO";
import { ProfilePhoto } from "Presentation/components/Profile/ProfilePhoto";
import { Button } from "Presentation/components/Button";
import { handleOnPostulation } from "Logic/utils/handleOnPostulation";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/Modal";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { OfferMd } from "@/components/OfferMd";

export default function Offer({ profileId, queryKey }) {
  const { data: offer } = useQuery(queryKey, getOfferById);
  const { renderModal, close, modalOpen, open } = useModal();
  const [disabled, setDisabled] = useState(false);

  const onPostulation = () => {
    const res = handleOnPostulation({
      offer_id: offer.id,
      destination_id: offer.owner_id,
      origin_id: profileId,
    });
    if (res) {
      open();
      setDisabled(true);
    }
    if (!res) {
      close();
    }
  };

  return (
    <div className="p-8">
      {renderModal({
        condition: modalOpen,
        modal: (
          <Modal
            title="Creacion exitosa"
            text=""
            handleClose={close}
            icon={<CheckCircleIcon className="w-12 h-12 text-green-500" />}
          />
        ),
      })}
      <div className="flex gap-4 my-4">
        <ProfilePhoto href={`/profile/${offer?.owner_id}`} />
        <div className="flex flex-col">
          <span>
            <strong>{offer.profile.name}</strong> {offer.profile.last_name}
          </span>
          <span className="capitalize">{getDateFormat(offer?.created_at)}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <OfferMd
          name={offer?.name}
          price={offer?.price}
          tags={offer?.tags}
          description={offer?.description}
        />
      </div>
      {profileId !== offer.owner_id &&
      offer.in_progress === "not-in-progress" ? (
        <div className="mt-8 flex justify-center">
          <Button
            text="Postularme a la oferta de trabajo"
            onClick={onPostulation}
            disabled={disabled}
          />
        </div>
      ) : (
        <></>
      )}
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
