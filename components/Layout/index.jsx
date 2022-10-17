import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { Navbar } from '../Navbar';

const Layout = ({ isAuth, children }) => {
  const [notifications, setNotifications] = useState([]);
  const [fetchedNotifications, setFetchedNotifications] = useState(false);

  const fetchNotifications = async () => {
    let { data: notifications, error } = await supabase
      .from('notifications')
      .select(
        `*, offers (id, name, resume, created_at), origin_id (id, name, last_name, picture)`
      )
      .eq('viewed', false);
    setNotifications(notifications);
    setFetchedNotifications(true);
    console.log('fethed notifications');
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
