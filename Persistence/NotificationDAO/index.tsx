import jws from "jsonwebtoken";
import { notification } from "@/types/types";
import { handleSupabaseError } from "@/utils/handleSupabaseError";
import { supabase } from "@/utils/supabaseClient";
import { useQuery } from "react-query";
import { getProfileById } from "../UserDAO";

const mapNotificationsFromAPI = (data): Array<notification> => {
  return data.map((notification) => ({
    ...notification,
  }));
};

const getNotifications = async (params): Promise<Array<notification>> => {
  const { id } = params.queryKey[1];

  const data = await supabase
    .from("notifications")
    .select(
      `*, offers (id, name, resume, created_at), origin_id (id, name, last_name, picture)`
    )
    .eq("destination_id", id)
    .eq("viewed", false)
    .then(handleSupabaseError)
    .then(({ data }) => mapNotificationsFromAPI(data));

  console.log("fetching from supabase");
  return data;
};

export { getNotifications };
