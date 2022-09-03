import Link from 'next/link';
import { Navbar } from '../Navbar';

const Layout = ({ isAuth, children }) => {
  return (
    <div>
      <Navbar
        //Add profile link to the navbar if is authenticated
        render={() => {
          if (isAuth) {
            return (
              <Link href="/profile">
                <a>Profile</a>
              </Link>
            );
          }
          return (
            <>
              <Link href="/login">
                <a>Iniciar sesión</a>
              </Link>
              <Link href="/sign-up">
                <a>Crear cuanta</a>
              </Link>
            </>
          );
        }}
      />
      {children}
    </div>
  );
};

export { Layout };
