import Link from "next/link";
import { Wea } from "@/Icons/Wea";
import { NavbarSidebarMenu } from "./NavbarSidebarMenu";
import { NavbarSidebarNotifications } from "./NavbarSidebarNotifications";
import { useNavbar } from "@/hooks/useNavbar";
import { NotificationBellIcon } from "./NotificationBellIcon";
import { MenuBurgerButtonIcon } from "./MenuBurgerButtonIcon";
import { NavbarIcon } from "./NavbarIcon";

const Navbar = ({ isAuth }) => {
  const { navigation, onNavigation, notification, onNotification } =
    useNavbar();

  return (
    <nav className="z-50 sticky top-0 shadow-md flex justify-between px-6 py-2 bold text-lg bg-background h-fit">
      <MenuBurgerButtonIcon
        navigation={navigation}
        notification={notification}
        onNavigation={onNavigation}
      />

      <NavbarSidebarMenu navigation={navigation} onNavigation={onNavigation} />

      <Link href={`${process.env.NEXT_PUBLIC_ROOT_URL}/`}>
        <a>
          <Wea className="mt-3 scale-150" />
        </a>
      </Link>

      {!navigation && !isAuth ? (
        <NavbarIcon href="/login" title="Ingresar" />
      ) : (
        <>
          <NotificationBellIcon
            isAuth={isAuth}
            onNotification={onNotification}
            notification={notification}
            navigation={navigation}
          />

          <NavbarSidebarNotifications
            isOpen={notification}
            onNotification={onNotification}
          />
        </>
      )}
    </nav>
  );
};

export { Navbar };
