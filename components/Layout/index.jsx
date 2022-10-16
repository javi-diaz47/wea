import Link from 'next/link';
import { Navbar } from '../Navbar';

const Layout = ({ isAuth, children }) => {
  return (
    <div>
      <Navbar
        //Add profile link to the navbar if is authenticated
        isAuth={isAuth}
      />
      {children}
    </div>
  );
};

export { Layout };
