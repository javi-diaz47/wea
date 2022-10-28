import { Sidebar } from "@/components/Sidebar";
import { useQuery } from "react-query";
import { getNotifications } from "@/Persistence/NotificationDAO";
import { NotificationList } from "../NotificationList";
import { getProfileById, getProfileId } from "@/Persistence/UserDAO";
import { useContext } from "react";
import { getCookies } from "cookies-next";

const NavbarSidebarNotifications = ({
  isOpen,
  onNotification,
}: {
  isOpen: boolean;
  onNotification: () => void;
}) => {
  const { data: id } = useQuery("profileId", getProfileId, {
    staleTime: 10000,
  });
  const {
    data: notifications,
    error,
    isLoading,
  } = useQuery(["notifications", { id }], getNotifications, {
    enabled: !!id,
  });

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
