import { getDateFormat } from "../../utils/getDateFormat";
import { supabase } from "../../utils/supabaseClient";
import { ProfilePhoto } from "@/components/ProfilePhoto";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import { getOfferByNotificationIdAndProfileId } from "@/Persistence/OfferDAO";
import { OfferMd } from "@/components/OfferMd";
import { OfferNotification } from "@/types/types";
import {
  onAcceptRecievedJobOffer,
  onDenyRecievedJobOffer,
} from "@/utils/handleRecievedJobOffer";

interface PageProps {
  id: string;
  data: OfferNotification;
}

function RecievedOffersId({ id, data }: PageProps) {
  const { offer, origin_id } = data;

  return (
    <div className="p-8">
      <div className="flex gap-4 my-4">
        <ProfilePhoto
          href={`${process.env.NEXT_PUBLIC_ROOT_URL}/profile/${offer?.owner_id}`}
        />
        <div className="flex flex-col">
          <span>
            <strong>{origin_id.name}</strong> {data?.origin_id.last_name}
          </span>
          <span className="capitalize">{getDateFormat(offer?.created_at)}</span>
        </div>
      </div>
      <OfferMd
        name={offer.name}
        tags={offer.tags}
        description={offer.description}
        price={offer.price}
      />
      <div>
        <button
          onClick={() =>
            onAcceptRecievedJobOffer({
              offer_id: offer.id,
              worker_id: id,
              notification_id: data.notification_id,
            })
          }
        >
          Aceptar oferta de trabajo
        </button>
        <button onClick={() => onDenyRecievedJobOffer(data.notification_id)}>
          Rechazar oferta de trabajo
        </button>
      </div>
    </div>
  );
}

export default RecievedOffersId;

export async function getServerSideProps({ req, res, params }) {
  const token = getCookie("token", { req, res });
  const id = jwt.decode(token).sub;

  const data = await getOfferByNotificationIdAndProfileId({
    notification_id: params.id,
    profile_id: id,
  });

  if (id === data.destination_id) {
    return {
      props: {
        id,
        data,
      },
    };
  }

  return {
    props: {
      redirect: {
        destination: `${process.env.NEXT_PUBLIC_ROOT_URL}/recieved-offers`,
      },
    },
  };
}

export async function getServerSidePaths() {
  const { data: recievedOffers, error } = await supabase
    .from("notifications")
    .select("id")
    .eq("type", "offer");

  console.log(recievedOffers);

  return {
    paths: recievedOffers.map((recievedOffer) => ({
      params: {
        id: recievedOffer.id,
      },
    })),
    fallback: false,
  };
}
