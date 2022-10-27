import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { supabase } from "../../utils/supabaseClient";
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
