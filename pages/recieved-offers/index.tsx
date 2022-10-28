import { getOfferNotificationByProfileId } from "@/Persistence/OfferDAO";
import { OfferNotification } from "@/types/types";
import {
  onAcceptRecievedJobOffer,
  onDenyRecievedJobOffer,
} from "@/utils/handleRecievedJobOffer";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import { OfferCard } from "../../components/Cards/OfferCard";

interface PageProps {
  profileId: string;
  recievedOffers: Array<OfferNotification>;
}

function RecievedOffers({ profileId, recievedOffers }: PageProps) {
  return (
    <div className="flex flex-col gap-8 m-8">
      <h2 className="text-4xl font-semibold">Ofertas recibidas</h2>
      <ul className=" flex flex-col gap-12">
        {recievedOffers.map(({ offer, origin_id, notification_id }) => (
          <li key={notification_id}>
            <OfferCard
              offer={offer}
              href={`recieved-offers/${notification_id}`}
              profile={origin_id}
            >
              <div className="flex justify-center gap-8 ">
                <button
                  onClick={() =>
                    onAcceptRecievedJobOffer({
                      offer_id: offer.id,
                      worker_id: profileId,
                      notification_id,
                    })
                  }
                  className="text-primary border-primary bg-transparent border-2 font-semibold py-1 px-2 rounded-full"
                >
                  Aceptar
                </button>
                <button
                  onClick={() => onDenyRecievedJobOffer(notification_id)}
                  className="text-love border-love border-2 rounded-full
                  font-semibold py-1 px-2"
                >
                  Rechazar
                </button>
              </div>
            </OfferCard>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecievedOffers;

export async function getServerSideProps({ req, res }) {
  const token = getCookie("token", { req, res });
  const id = jwt.decode(token).sub;

  const recievedOffers = await getOfferNotificationByProfileId(id);
  console.log(recievedOffers);
  return {
    props: {
      profileId: id,
      recievedOffers,
    },
  };
}
