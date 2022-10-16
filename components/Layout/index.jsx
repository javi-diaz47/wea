import Link from 'next/link';
import { Navbar } from '../Navbar';

import { BellIcon } from '@heroicons/react/outline';

const Layout = ({ isAuth, children }) => {
  return (
    <div>
      <Navbar
        //Add profile link to the navbar if is authenticated
        render={() => {
          if (isAuth === 'authenticated') {
            return (
              <Link href="/profile">
                <a>
                  <BellIcon className="w-12 h-12" />
                </a>
              </Link>
            );
          }
          return (
            <>
              <Link href="/login">
                <a>Iniciar sesión</a>
              </Link>
              {/* <Link href="/sign-up">
                <a>Crear cuanta</a>
              </Link> */}
            </>
          );
        }}
      />
      {children}
    </div>
  );
};

export { Layout };
