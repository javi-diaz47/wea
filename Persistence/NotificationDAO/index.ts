import jws from "jsonwebtoken";
import { notification } from "@/types/types";
import { handleSupabaseError } from "@/utils/handleSupabaseError";
import { supabase } from "@/utils/supabaseClient";
import { useQuery } from "react-query";
import { getProfileById } from "../UserDAO";

const notificationQuery = `id, 
      offer_id (id, name, resume, description, created_at), 
      origin_id (id, name, last_name, picture), 
      destination_id, type`;

const mapNotificationFromAPI = (data): notification => {
  return {
    id: data.id,
    origin_id: { ...data.origin_id },
    destination_id: data.destination_id,
    offer: { ...data.offer_id },
    type: data.type,
  };
};

const getNotification = async (params): Promise<notification> => {
  const {
    destination_id,
    queryCondition: { column, value },
  } = params.queryKey[1];

  if (!!value) {
    const data = await supabase
      .from("notifications")
      .select(notificationQuery)
      .eq("destination_id", destination_id)
      .eq(column, value)
      .limit(1)
      .single()
      .then(handleSupabaseError)
      .then(({ data }) => mapNotificationFromAPI(data));
    return data;
  }

  const data = await supabase
    .from("notifications")
    .select(notificationQuery)
    .eq("destination_id", destination_id)
    .eq("viewed", false)
    .then(handleSupabaseError)
    .then(({ data }) => mapNotificationFromAPI(data));

  console.log("fetching from supabase");
  return data;
};

// const mapNotificationsFromAPI = (data): Array<notification> => {
//   return data.map(mapNotificationFromAPI);
// };

const getAllNotifications = async (params): Promise<Array<notification>> => {
  const {
    destination_id,
    queryCondition: { column, value },
  } = params.queryKey[1];

  if (!!value) {
    const data = await supabase
      .from("notifications")
      .select(notificationQuery)
      .eq("destination_id", destination_id)
      .eq(column, value)
      .then(handleSupabaseError)
      .then(({ data }) => data.map(mapNotificationFromAPI));
    return data;
  }

  const data = await supabase
    .from("notifications")
    .select(notificationQuery)
    .eq("destination_id", destination_id)
    .eq("viewed", false)
    .then(handleSupabaseError)
    .then(({ data }) => data.map(mapNotificationFromAPI));

  console.log("fetching from supabase");
  return data;
};

const removeNotification = async (id: string) => {
  const data = await supabase.from("notifications").delete().eq("id", id);
  console.log(data);
};

export { getNotification, getAllNotifications, removeNotification };
