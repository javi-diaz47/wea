import { ProfileUserWithStar } from "@/components/Profile/ProfileUserWithStar";
import { Profile } from "@/types/BusinessEntities/Profile";
import { notification } from "@/types/types";
import { onAcceptOffer, onDenyOffer } from "@/utils/handleAceptDenyOffer";
import { Card } from "../Card";

const PostulationCard = ({ notification }: { notification: notification }) => {
  const { id, origin_id, offer } = notification;
  return (
    <Card>
      <div className="flex flex-col gap-4 w-full">
        <ProfileUserWithStar
          name={origin_id.name}
          last_name={origin_id.last_name}
          href={`profile/${origin_id.id}`}
          star={origin_id.calification}
        />

        <div>{origin_id?.resume}</div>

        <div className="flex w-full justify-between">
          <button
            onClick={() =>
              onAcceptOffer({
                notification_id: id,
                worker_id: origin_id.id,
                offer_id: offer.id,
              })
            }
            className="px-2 font-semibold text-primary bg-transparent border-2 border-primary rounded-lg"
          >
            Aceptar
          </button>
          <button
            onClick={() => onDenyOffer(id)}
            className="px-2 font-semibold text-love bg-transparent border-2 border-love rounded-lg"
          >
            Rechazar
          </button>
        </div>

        {/* <button className=" border border-primary text-primary h-fit py-1 px-3 rounded-lg shadow-sm hover:bg-primary hover:text-white duration-200">
          Ver postulaciones
        </button> */}
      </div>
    </Card>
  );
};

export { PostulationCard };
