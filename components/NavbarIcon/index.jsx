import Link from 'next/link';
import { useRouter } from 'next/router';
import { cloneElement } from 'react';

const NavbarIcon = ({ href, title, icon, onClick }) => {
  const router = useRouter();
  return (
    <Link href={href}>
      <a
        onClick={onClick}
        className={`
         w-24 flex flex-col place-items-center text-center
        ${router.pathname === href ? 'text-primary' : ''}
      `}
      >
        {cloneElement(icon, { className: 'w-8 h-8' })}
        {/* {icon} */}
        {title}
      </a>
    </Link>
  );
};

export { NavbarIcon };
