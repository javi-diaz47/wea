import { Navbar } from "../Navbar";

const Layout = ({ isAuth, children }) => {
  return (
    <div className="bg-background min-h-screen">
      <Navbar isAuth={isAuth} />
      {children}
    </div>
  );
};

export { Layout };
