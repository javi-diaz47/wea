import {
  HomeIcon,
  BriefcaseIcon,
  UserGroupIcon,
  ClipboardListIcon,
  NewspaperIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { NavbarIcon } from "../NavbarIcon";
import { Sidebar } from "@/components/Sidebar";

interface NavbarSidebarProps {
  navigation: boolean;
  onNavigation: () => void;
}

const NavbarSidebarMenu = ({
  navigation,
  onNavigation,
}: NavbarSidebarProps) => {
  return (
    <Sidebar open={navigation}>
      <NavbarIcon
        href="/"
        title="Inicio"
        icon={<HomeIcon />}
        onClick={onNavigation}
      />

      <NavbarIcon
        href="/offers"
        title="Ofertas"
        icon={<BriefcaseIcon />}
        onClick={onNavigation}
      />

      <NavbarIcon
        href="/profile"
        title="Perfil"
        icon={<UserIcon />}
        onClick={onNavigation}
      />

      <NavbarIcon
        href="/recieved-postulations"
        title="Postulaciones Recibidas"
        icon={<UserGroupIcon />}
        onClick={onNavigation}
      />

      <NavbarIcon
        href="/recieved-offers"
        title="Ofertas Recibidas"
        icon={<ClipboardListIcon />}
        onClick={onNavigation}
      />

      <NavbarIcon
        href="/job-in-progress/"
        title="Trabajo en Progreso"
        icon={<NewspaperIcon />}
        onClick={onNavigation}
      />
    </Sidebar>
  );
};

export { NavbarSidebarMenu };
