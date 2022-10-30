import { Navbar } from "../Navbar";

const Layout = ({ isAuth, children }) => {
  return (
    <div className="bg-background ">
      <Navbar isAuth={isAuth} />
      {children}
    </div>
  );
};

export { Layout };
