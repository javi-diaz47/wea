import { getAllNotifications } from "@/Persistence/NotificationDAO";
import { onAcceptOffer, onDenyOffer } from "Logic/utils/handleAceptDenyOffer";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { OfferCard } from "Presentation/components/Cards/OfferCard";
import { Empty } from "Presentation/components/Empty";
import { Modal } from "@/components/Modal";
import { useModal } from "@/hooks/useModal";
import { XCircleIcon } from "@heroicons/react/outline";

function RecievedOffers({ profileId, queryKey }) {
  const { data: notifications } = useQuery(queryKey, getAllNotifications);
  const { modalOpen, open, close, renderModal } = useModal();

  return (
    <div className="flex flex-col gap-8 m-8">
      <h2 className="text-4xl font-semibold">Ofertas recibidas</h2>
      {renderModal({
        condition: modalOpen,
        modal: (
          <Modal
            title="Aceptaste la oferta"
            text=""
            handleClose={close}
            icon={<XCircleIcon className="w-12 h-12 text-love" />}
          />
        ),
      })}
      <ul className="flex flex-col gap-12">
        {notifications.length === 0 ? (
          <Empty text="Por el momento no has recibido ninguna oferta" />
        ) : (
          notifications.map(({ offer, profile, id }) => (
            <li key={id}>
              <OfferCard
                offer={offer}
                href={`recieved-offers/${id}`}
                profile={profile}
              >
                <div className="flex justify-center gap-8 ">
                  <button
                    onClick={() => {
                      const error = onAcceptOffer({
                        offer_id: offer.id,
                        worker_id: profileId,
                        notification_id: id,
                      });

                      if (!error) {
                        open();
                      }
                    }}
                    className="text-primary border-primary bg-transparent border-2 font-semibold py-1 px-2 rounded-full"
                  >
                    Aceptar
                  </button>
                  <button
                    onClick={() => onDenyOffer(id)}
                    className="text-love border-love border-2 rounded-full
                  font-semibold py-1 px-2"
                  >
                    Rechazar
                  </button>
                </div>
              </OfferCard>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default RecievedOffers;

export async function getServerSideProps({ req, res }) {
  const token = getCookie("token", { req, res });
  const id = jwt.decode(token).sub;

  const queryClient = new QueryClient();

  const queryCondition = {
    column: "type",
    value: "offer",
  };

  const queryKey = ["recieved-offers", { destination_id: id, queryCondition }];

  await queryClient.prefetchQuery(queryKey, getAllNotifications);

  return {
    props: {
      profileId: id,
      queryKey,
      dehydratedState: dehydrate(queryClient),
    },
  };
}
