import { removeNotification } from "@/Persistence/NotificationDAO";
import { addWorkerToOffer } from "@/Persistence/OfferDAO";

interface Props {
  offer_id: string;
  worker_id: string;
  notification_id: string;
}

const onAcceptOffer = async ({
  offer_id,
  worker_id,
  notification_id,
}: Props) => {
  console.log({ offer_id, worker_id });
  const err = addWorkerToOffer({
    offer_id,
    worker_id,
  });
  removeNotification(notification_id);

  return err;
};

const onDenyOffer = (notification_id: string) => {
  const res = removeNotification(notification_id);
  return res;
};

export { onAcceptOffer, onDenyOffer };
