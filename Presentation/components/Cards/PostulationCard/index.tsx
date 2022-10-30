import { Modal } from "@/components/Modal";
import { ProfileUserWithStar } from "@/components/Profile/ProfileUserWithStar";
import { useModal } from "@/hooks/useModal";
import { Profile } from "@/types/BusinessEntities/Profile";
import { notification, notificationCard } from "@/types/types";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/outline";
import { onAcceptOffer, onDenyOffer } from "Logic/utils/handleAceptDenyOffer";
import { useRouter } from "next/router";
import { Card } from "../Card";

const PostulationCard = ({
  notification,
}: {
  notification: notificationCard;
}) => {
  const { id, profile, offer, origin_id } = notification;

  const { modalOpen, open, close, renderModal } = useModal();
  const router = useRouter();
  const accept = () => {
    const res = onAcceptOffer({
      notification_id: id,
      worker_id: origin_id,
      offer_id: offer.id,
    });

    if (res) {
      open();
      setTimeout(() => {
        router.push(`profile/${origin_id}`);
      }, 800);
    }
    if (!res) {
      close();
    }
  };

  const deny = () => {
    const res = onDenyOffer(id);

    if (res) {
      open();
      setTimeout(() => {
        router.reload();
      }, 800);
    }
    if (!res) {
      close();
    }
  };

  return (
    <Card>
      {renderModal({
        condition: modalOpen,
        modal: (
          <Modal
            title="Se guardo exitosamente su respuesta"
            text=""
            handleClose={close}
            icon={<CheckCircleIcon className="w-12 h-12 text-green-500" />}
          />
        ),
      })}
      <div className="flex flex-col gap-4 w-full">
        <ProfileUserWithStar
          name={profile.name}
          last_name={profile.last_name}
          href={`profile/${origin_id}`}
          star={profile.calification}
        />

        <div>{profile?.resume}</div>

        <div className="flex w-full justify-between">
          <button
            onClick={accept}
            className="px-2 font-semibold text-primary bg-transparent border-2 border-primary rounded-lg"
          >
            Aceptar
          </button>
          <button
            onClick={deny}
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
