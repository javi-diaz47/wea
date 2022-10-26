import { XIcon, BellIcon } from "@heroicons/react/outline";
import { NavbarIcon } from "../NavbarIcon";

interface Props {
  isAuth: boolean;
  navigation: boolean;
  notification: boolean;
  onNotification: () => void;
}

const NotificationBellIcon = ({
  isAuth,
  onNotification,
  notification,
  navigation,
}: Props) => {
  if (isAuth)
    return (
      <button onClick={onNotification} className="z-20">
        {!notification && (
          <BellIcon
            className={`w-10 h-10 duration-200 delay-200 ${
              navigation ? "opacity-0" : " opacity-100"
            }`}
          />
        )}
        {!!notification && <XIcon className="w-10 h-10" />}
      </button>
    );

  if (!navigation && !isAuth)
    return <NavbarIcon href="/login" title="Ingresar" />;
};

export { NotificationBellIcon };
