import { setNotification } from "@/Persistence/NotificationDAO";
import { notification } from "@/types/types";

const handleOnPostulation = (notification: notification) => {
  setNotification({ ...notification, type: "postulation" });
};

export { handleOnPostulation };
