import { handleSupabaseError } from "@/utils/handleSupabaseError";
import { supabase } from "@/utils/supabaseClient";

const getNotifications = async () => {
  const data = await supabase
    .from("notifications")
    .select(
      `*, offers (id, name, resume, created_at), origin_id (id, name, last_name, picture)`
    )
    .eq("viewed", false)
    .then(handleSupabaseError)
    .then(({ data }) => data);

  console.log("fetching from supabase");
  return data;
};

const setNotification = () => {};

export { getNotifications, setNotification };
