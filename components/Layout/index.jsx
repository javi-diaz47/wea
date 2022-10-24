import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import { Navbar } from "../Navbar";

const Layout = ({ isAuth, children }) => {
  const [notifications, setNotifications] = useState([]);
  const [fetchedNotifications, setFetchedNotifications] = useState(false);

  const fetchNotifications = async () => {
    // let { data: notifications, error } = await supabase
    //   .from('notifications')
    //   .select(
    //     `*, offers (id, name, resume, created_at), origin_id (id, name, last_name, picture)`
    //   )
    //   .eq('viewed', false);
    // setNotifications(notifications);
    // setFetchedNotifications(true);
    setNotifications([
      {
        id: "542d34c1-ef97-44b0-8fa2-f858d558034e",
        origin_id: {
          id: "3b701f8a-7fdd-4a4d-ad18-e84f0ff9505e",
          name: "Javi Inc",
          last_name: null,
          picture: null,
        },
        destination_id: "843edb12-63fa-4351-a549-d39d21b45199",
        offer_id: "a502cab4-873e-438d-917d-c512fdc6dd45",
        viewed: false,
        created_at: "2022-10-17T20:31:52.268172+00:00",
        type: "offer",
        offers: {
          id: "a502cab4-873e-438d-917d-c512fdc6dd45",
          name: "Desarrollo de página web para mi negocio",
          resume: "Pagina web basica",
          created_at: "2022-10-16T21:07:38.17149+00:00",
        },
      },
      {
        id: "9a3e0212-8c8e-443a-9e49-ce894572265f",
        origin_id: {
          id: "843edb12-63fa-4351-a549-d39d21b45199",
          name: "Javier",
          last_name: "Diaz",
          picture: null,
        },
        destination_id: "3b701f8a-7fdd-4a4d-ad18-e84f0ff9505e",
        offer_id: "4b2477b9-0588-4b2b-a39e-f730d51d9b0a",
        viewed: false,
        created_at: "2022-10-17T20:33:16.989759+00:00",
        type: "postulation",
        offers: {
          id: "4b2477b9-0588-4b2b-a39e-f730d51d9b0a",
          name: "Fullstack",
          resume:
            " Se necesita desarrollador web para la digitalizacion de mi portafolio de servicios",
          created_at: "2022-10-16T21:02:42.529845+00:00",
        },
      },
    ]);
    console.log("fethed notifications from layout");
  };

  useEffect(() => {
    if (!fetchedNotifications) {
      fetchNotifications();
    }
  }, [fetchedNotifications]);

  return (
    <div className="bg-background min-h-screen">
      <Navbar
        //Add profile link to the navbar if is authenticated
        isAuth={isAuth}
        notifications={notifications}
      />
      {children}
    </div>
  );
};

export { Layout };
