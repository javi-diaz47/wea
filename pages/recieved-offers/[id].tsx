import { getDateFormat } from "Logic/utils/getDateFormat";
import { supabase } from "Logic/utils/supabaseClient";
import { ProfilePhoto } from "Presentation/components/Profile/ProfilePhoto";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import { OfferMd } from "Presentation/components/OfferMd";
import { onAcceptOffer, onDenyOffer } from "Logic/utils/handleAceptDenyOffer";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getNotification } from "@/Persistence/NotificationDAO";

function RecievedOffersId({ profileId, queryKey }) {
  const { data: notification } = useQuery(queryKey, getNotification);

  return (
    <div className="p-8">
      <div className="flex gap-4 my-4">
        <ProfilePhoto
          href={`${process.env.NEXT_PUBLIC_ROOT_URL}/profile/${notification?.offer.owner_id}`}
        />
        <div className="flex flex-col">
          <span>
            <strong>{notification?.profile.name}</strong>{" "}
            {notification?.profile.last_name}
          </span>
          <span className="capitalize">
            {getDateFormat(notification?.offer.created_at)}
          </span>
        </div>
      </div>
      <OfferMd
        name={notification?.offer.name}
        tags={notification?.offer.tags}
        description={notification?.offer.description}
        price={notification?.offer.price}
      />
      <div>
        <button
          onClick={() =>
            onAcceptOffer({
              offer_id: notification?.offer.id,
              worker_id: profileId,
              notification_id: notification?.id,
            })
          }
        >
          Aceptar oferta de trabajo
        </button>
        <button onClick={() => onDenyOffer(notification?.id)}>
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

  const queryClient = new QueryClient();

  const queryCondition = {
    column: "id",
    value: params.id,
  };

  const queryKey = [
    "recieved-offers-id",
    { destination_id: id, queryCondition },
  ];

  await queryClient.prefetchQuery(queryKey, getNotification);

  return {
    props: {
      profileId: id,
      queryKey,
    },
  };
}

export async function getServerSidePaths() {
  const { data: recievedOffers, error } = await supabase
    .from("notifications")
    .select("id")
    .eq("type", "offer");

  return {
    paths: recievedOffers.map((recievedOffer) => ({
      params: {
        id: recievedOffer.id,
      },
    })),
    fallback: false,
  };
}
