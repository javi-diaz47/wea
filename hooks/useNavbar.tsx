import { useState } from "react";

const useNavbar = () => {
  const [navigation, setNavigation] = useState(false);
  const [notification, setNotification] = useState(false);

  const onNavigation = () => {
    const newNavigation = !navigation;
    setNavigation(newNavigation);
  };

  const onNotification = () => {
    const newNotification = !notification;
    setNotification(newNotification);
  };

  return {
    navigation,
    onNavigation,
    notification,
    onNotification,
  };
};

export { useNavbar };
