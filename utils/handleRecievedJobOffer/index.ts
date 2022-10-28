import { removeNotification } from "@/Persistence/NotificationDAO";
import { addWorkerToOffer } from "@/Persistence/OfferDAO";

interface Props {
  offer_id: string;
  worker_id: string;
  notification_id: string;
}

export const onAcceptRecievedJobOffer = async ({
  offer_id,
  worker_id,
  notification_id,
}: Props) => {
  addWorkerToOffer({
    offer_id,
    worker_id,
  });
  removeNotification(notification_id);
};

export const onDenyRecievedJobOffer = (notification_id: string) => {
  removeNotification(notification_id);
};
