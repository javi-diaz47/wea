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
} from '@heroicons/react/outline';
import { useState } from 'react';
import { NavbarIcon } from '../NavbarIcon';

const Navbar = ({ render }) => {
  const [notification, setNotification] = useState(false);

  const onNotification = () => {
    const newNotification = !notification;
    setNotification(newNotification);
    console.log(notification);
  };
  return (
    <nav className="flex justify-between mx-6 bold text-lg bg-background">
      <button onClick={onNotification} className="z-20">
        {!!notification && <MenuAlt4Icon className="w-12 h-12" />}
        {!notification && <XIcon className="w-12 h-12" />}
      </button>
      <div
        className={`absolute w-full h-full duration-500 ease-in-out z-10 bg-background right-0
            flex flex-col justify-center gap-10 items-center shadow-md
            ${notification ? '-left-full' : 'left-0'}
          `}
      >
        <NavbarIcon
          href="/"
          title="Inicio"
          icon={<HomeIcon />}
          onClick={onNotification}
        />

        <NavbarIcon
          href="/offers"
          title="Ofertas"
          icon={<BriefcaseIcon />}
          onClick={onNotification}
        />

        <NavbarIcon
          href="/profile"
          title="Perfil"
          icon={<UserIcon />}
          onClick={onNotification}
        />

        <NavbarIcon
          href="/postulations"
          title="Postulaciones Recibidas"
          icon={<UserGroupIcon />}
          onClick={onNotification}
        />

        <NavbarIcon
          href="/recieved-offers/"
          title="Ofertas Recibidas"
          icon={<ClipboardListIcon />}
          onClick={onNotification}
        />

        <NavbarIcon
          href="/job-in-progress/"
          title="Trabajo en Progreso"
          icon={<NewspaperIcon />}
          onClick={onNotification}
        />
      </div>

      {render()}
    </nav>
  );
};

export { Navbar };
