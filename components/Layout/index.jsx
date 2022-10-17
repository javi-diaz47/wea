import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { Navbar } from '../Navbar';

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
    setFetchedNotifications(true);
    setNotifications([
      {
        id: 2,
        origin_id: '3b701f8a-7fdd-4a4d-ad18-e84f0ff9505e',
        destination_id: '843edb12-63fa-4351-a549-d39d21b45199',
        viewed: false,
        offer_id: 'a502cab4-873e-438d-917d-c512fdc6dd45',
        offers: {
          id: 'a502cab4-873e-438d-917d-c512fdc6dd45',
          name: 'Desarrollo de página web para mi negocio',
          resume: 'Pagina web basica',
          created_at: '2022-10-16T21:07:38.17149+00:00',
        },
        origin_id: {
          id: '3b701f8a-7fdd-4a4d-ad18-e84f0ff9505e',
          name: 'Javi Inc',
          last_name: null,
          picture: null,
        },
      },
      {
        id: 3,
        origin_id: '3b701f8a-7fdd-4a4d-ad18-e84f0ff9505e',
        destination_id: '843edb12-63fa-4351-a549-d39d21b45199',
        viewed: false,
        offer_id: 'a502cab4-873e-438d-917d-c512fdc6dd45',
        offers: {
          id: 'a502cab4-873e-438d-917d-c512fdc6dd45',
          name: 'Desarrollo de página web para mi negocio',
          resume: 'Pagina web basica',
          created_at: '2022-10-16T21:07:38.17149+00:00',
        },
        origin_id: {
          id: '3b701f8a-7fdd-4a4d-ad18-e84f0ff9505e',
          name: 'Javi Inc',
          last_name: null,
          picture: null,
        },
      },
    ]);
    console.log(notifications);
    console.log('fethed notifications from layer');
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
