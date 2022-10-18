import { Collabs } from '../../Collabs';
import { cloneElement } from 'react';
import {
  UserIcon,
  ClipboardListIcon,
  PhoneIcon,
} from '@heroicons/react/outline';

const ProfileInformation = ({ who_am_i, resume, contact_me, children }) => {
  const info = [
    { title: '¿Quién soy?', icon: <UserIcon />, desc: who_am_i },
    {
      title: 'Mis Servicios',
      icon: <ClipboardListIcon />,
      desc: resume,
    },
    { title: 'Contactame', icon: <PhoneIcon />, desc: contact_me },
  ];
  return (
    <section className="">
      {info.map(({ title, icon, desc }) => (
        <Collabs
          title={title}
          icon={cloneElement(icon, { className: 'w-6 h-6 text-primary' })}
          desc={desc}
        />
      ))}
      {children}
    </section>
  );
};
export { ProfileInformation };
