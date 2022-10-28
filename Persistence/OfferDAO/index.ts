import { Offer } from "@/types/BusinessEntities/Offer";
import { supabase } from "@/utils/supabaseClient";
import { handleSupabaseError } from "@/utils/handleSupabaseError";
import { offerCard, OfferNotification } from "@/types/types";
import { Profile } from "@/types/BusinessEntities/Profile";

const mapOfferCardFromApi = (data): offerCard => {
  return {
    id: data.id,
    name: data.name,
    resume: data.resume,
    description: data.description,
    tags: data.tags,
    price: data.price,
    calification: data.calification,
    owner_id: data.owner_id.id,
    worker_id: data.worker_id,
    offer_type: data.offer_type,
    in_progress: data.in_progress,
    created_at: data.created_at,
    profile: {
      name: data.owner_id.name,
      last_name: data.owner_id?.last_name,
      picture: data.owner_id?.picture,
    },
  };
};

const mapOfferFromApi = (data): Offer => {
  return {
    ...data,
  };
};

const getOfferById = async (params): Promise<offerCard> => {
  const { id } = params.queryKey[1];
  const data = await supabase
    .from("offers")
    .select("*, owner_id (id, name, last_name, picture)")
    .eq("id", id)
    .limit(1)
    .single()
    .then(handleSupabaseError)
    .then(({ data }) => mapOfferCardFromApi(data));

  console.log("fetching from supabase");
  return data;
};

const setOffer = async (offer: Offer): Promise<Offer> => {
  const { data, error } = await supabase
    .from("offers")
    .insert([{ ...offer }], { upsert: true });

  return mapOfferFromApi(data);
};

const mapOfferNotificationFromApi = (data): OfferNotification => {
  return {
    notification_id: data.id,
    offer: { ...data.offer_id },
    origin_id: { ...data.origin_id },
    destination_id: data.destination_id,
  };
};

const getOfferNotificationByProfileId = async (
  profile_id: string
): Promise<Array<OfferNotification>> => {
  const data = await supabase
    .from("notifications")
    .select(
      `id, 
      offer_id (id, name, resume, description, created_at), 
      origin_id (id, name, last_name, picture), 
      destination_id`
    )
    .eq("destination_id", profile_id)
    .then(handleSupabaseError)
    .then(({ data }) => data.map(mapOfferNotificationFromApi));
  return data;
};

const getOfferByNotificationIdAndProfileId = async ({
  notification_id,
  profile_id,
}: {
  notification_id: string;
  profile_id: string;
}): Promise<OfferNotification> => {
  const data = await supabase
    .from("notifications")
    .select(
      `id, 
      offer_id (
        id, 
        name, 
        resume, 
        description, 
        created_at
      ), 
      origin_id (
        id, 
        name, 
        last_name, 
        picture
      ), 
      destination_id`
    )
    .eq("id", notification_id)
    .eq("destination_id", profile_id)
    .limit(1)
    .single()
    .then(handleSupabaseError)
    .then(({ data }) => mapOfferNotificationFromApi(data));
  return data;
};

const addWorkerToOffer = async ({ offer_id, worker_id }) => {
  const data = await supabase
    .from("offers")
    .update({ worker_id, in_progress: true })
    .eq("id", offer_id);

  console.log(data);
};

export {
  getOfferById,
  setOffer,
  getOfferByNotificationIdAndProfileId,
  getOfferNotificationByProfileId,
  addWorkerToOffer,
};
