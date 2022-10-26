import { Sidebar } from "@/components/Sidebar";
import { useQuery } from "react-query";
import { getNotifications } from "@/Persistence/NotificationDAO";
import { NotificationList } from "../NotificationList";

const NavbarSidebarNotifications = ({
  isOpen,
  onNotification,
}: {
  isOpen: boolean;
  onNotification: () => void;
}) => {
  const {
    data: notifications,
    error,
    isLoading,
  } = useQuery("notifications", getNotifications);

  return (
    <Sidebar open={isOpen} leftRight={false}>
      {!!isLoading ? (
        <div>is loading...</div>
      ) : (
        <NotificationList
          notifications={notifications}
          onNotification={onNotification}
        />
      )}
    </Sidebar>
  );
};

export { NavbarSidebarNotifications };
