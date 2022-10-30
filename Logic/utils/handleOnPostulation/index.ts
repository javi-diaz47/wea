import { setNotification } from "@/Persistence/NotificationDAO";
import { notification } from "@/types/types";

const handleOnPostulation = (notification: notification) => {
  const res = setNotification({ ...notification, type: "postulation" });
  return res;
};

export { handleOnPostulation };
