import Link from 'next/link';
import {
  MenuAlt4Icon,
  HomeIcon,
  BriefcaseIcon,
  UserGroupIcon,
  ClipboardListIcon,
  NewspaperIcon,
  UserIcon,
  XIcon,
  BellIcon,
} from '@heroicons/react/outline';
import { useState } from 'react';
import { NavbarIcon } from '../NavbarIcon';
import { Sidebar } from '../Sidebar';
import { AnchorButton } from '../AnchorButton';
import { useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { useRouter } from 'next/router';
import { OfferCard } from '../Cards/OfferCard';

const Navbar = ({ isAuth, notifications }) => {
  const [navigation, setNavigation] = useState(false);
  const [notification, setNotification] = useState(false);

  const route = useRouter();

  const onNavigation = () => {
    const newNavigation = !navigation;
    setNavigation(newNavigation);
  };
  const onNotification = () => {
    const newNotification = !notification;
    setNotification(newNotification);
  };

  const burgerButton = () => {
    return (
      <button onClick={onNavigation} className="z-20">
        {!navigation && (
          <MenuAlt4Icon
            className={`w-10 h-10 duration-200 delay-200 ${
              notification ? 'opacity-0' : ' opacity-100'
            }`}
          />
        )}
        {!!navigation && <XIcon className="w-10 h-10" />}
      </button>
    );
  };

  const notificationBell = () => {
    if (isAuth)
      return (
        <button onClick={onNotification} className="z-20">
          {!notification && (
            <BellIcon
              className={`w-10 h-10 duration-200 delay-200 ${
                navigation ? 'opacity-0' : ' opacity-100'
              }`}
            />
          )}
          {!!notification && <XIcon className="w-10 h-10" />}
        </button>
      );

    if (!navigation && !isAuth)
      return <NavbarIcon href="/login" title="Ingresar" />;
  };

  return (
    <nav className="flex justify-between px-6 py-2 bold text-lg bg-background h-fit">
      {burgerButton()}
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
          href="/postulations"
          title="Postulaciones Recibidas"
          icon={<UserGroupIcon />}
          onClick={onNavigation}
        />

        <NavbarIcon
          href="/recieved-offers/"
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

      {notificationBell()}
      <Sidebar open={notification} leftRight={false}>
        <ul className="h-full mt-12 p-8">
          {notifications?.map(({ id, offers, origin_id }) => (
            <li key={id} className="list-none m-0">
              <OfferCard offer={offers} profile={origin_id} />
            </li>
          ))}
        </ul>
      </Sidebar>
    </nav>
  );
};

export { Navbar };
