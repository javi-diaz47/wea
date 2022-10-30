import Link from "next/link";
import { Wea } from "@/Icons/Wea";
import { NavbarSidebarMenu } from "./NavbarSidebarMenu";
import { NavbarSidebarNotifications } from "./NavbarSidebarNotifications";
import { useNavbar } from "@/hooks/useNavbar";
import { NotificationBellIcon } from "./NotificationBellIcon";
import { MenuBurgerButtonIcon } from "./MenuBurgerButtonIcon";
import { NavbarIcon } from "./NavbarIcon";
import { useRouter } from "next/router";
import { NavbarLink } from "./NavbarLink";

const Navbar = ({ isAuth }) => {
  const { navigation, onNavigation, notification, onNotification } =
    useNavbar();

  const router = useRouter();
  const onLogin = () => {
    const a = router.pathname.includes("login");
    console.log(a);
    return a;
  };
  return (
    <nav className="h-12 px-8 py-4 z-50 sticky top-0 shadow-md flex justify-between items-center  bold text-lg bg-background">
      {isAuth ? (
        <MenuBurgerButtonIcon
          navigation={navigation}
          notification={notification}
          onNavigation={onNavigation}
        />
      ) : (
        <></>
      )}
      <NavbarSidebarMenu navigation={navigation} onNavigation={onNavigation} />

      <NavbarLink href="/">
        <Wea className=" scale-150" />
      </NavbarLink>

      {!navigation && !isAuth ? (
        onLogin() ? (
          <NavbarLink href="sign-up">Crear cuenta</NavbarLink>
        ) : (
          <NavbarLink href="login">Ingresar</NavbarLink>
        )
      ) : (
        <>
          <NotificationBellIcon
            isAuth={isAuth}
            onNotification={onNotification}
            notification={notification}
            navigation={navigation}
          />

          {/* <NavbarSidebarNotifications
            isOpen={notification}
            onNotification={onNotification}
          /> */}
        </>
      )}
    </nav>
  );
};

export { Navbar };
