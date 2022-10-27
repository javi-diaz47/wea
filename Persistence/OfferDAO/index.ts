import { Offer } from "@/types/BusinessEntities/Offer";
import { supabase } from "@/utils/supabaseClient";
import { handleSupabaseError } from "@/utils/handleSupabaseError";
import { offerCard } from "@/types/types";

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

export { getOfferById, setOffer };
