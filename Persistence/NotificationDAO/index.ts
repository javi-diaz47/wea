import jws from "jsonwebtoken";
import { notification, notificationCard } from "@/types/types";
import { handleSupabaseError } from "Logic/utils/handleSupabaseError";
import { supabase } from "Logic/utils/supabaseClient";
import { useQuery } from "react-query";
import { getProfileById } from "../UserDAO";

const notificationQuery = `id, 
      offer_id (id, name, resume, description, tags, owner_id, created_at), 
      origin_id (id, name, resume, last_name, picture), 
      destination_id, type`;

const mapNotificationFromAPI = (data): notificationCard => {
  return {
    id: data.id,
    origin_id: data.origin_id.id,
    destination_id: data.destination_id,
    offer: { ...data.offer_id, tags: [] },
    profile: {
      name: data?.origin_id?.name || "",
      last_name: data?.origin_id?.last_name || "",
      picture: data?.origin_id?.picture || "",
    },
    type: data.type,
  };
};

const getNotification = async (params): Promise<notificationCard> => {
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

const getAllNotifications = async (
  params
): Promise<Array<notificationCard>> => {
  const {
    destination_id,
    queryCondition: { column, value },
  } = params.queryKey[1];

  if (!!value) {
    console.log({ column, value });
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

const setNotification = async (notification: notification) => {
  const { data, error } = await supabase
    .from("notifications")
    .insert([{ ...notification }]);

  console.log(data);

  return data;
};

const removeNotification = async (id: string) => {
  const data = await supabase.from("notifications").delete().eq("id", id);
  return data;
};

export {
  getNotification,
  getAllNotifications,
  removeNotification,
  setNotification,
};
