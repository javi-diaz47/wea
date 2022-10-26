import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { supabase } from "../../utils/supabaseClient";
import { Navbar } from "../Navbar";

const Layout = ({ isAuth, children }) => {
  // const [notifications, setNotifications] = useState([]);
  // const [fetchedNotifications, setFetchedNotifications] = useState(false);

  // const {
  //   data: notifications,
  //   error,
  //   isLoading,
  // } = useQuery("notifications", getNotifications);

  return (
    <div className="bg-background min-h-screen">
      <Navbar
        //Add profile link to the navbar if is authenticated
        isAuth={isAuth}
        // notifications={notifications}
        // isLoadingNotifications={isLoading}
      />
      {children}
    </div>
  );
};

export { Layout };
