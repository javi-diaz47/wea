import { setNotification } from "@/Persistence/NotificationDAO";
import { notification } from "@/types/types";

const handleOnServiceOffer = (notification: notification) => {
  setNotification({ ...notification, type: "offer" });
};

export { handleOnServiceOffer };
