import { Offer } from "@/types/BusinessEntities/Offer";
import { supabase } from "@/utils/supabaseClient";
import { handleSupabaseError } from "@/utils/handleSupabaseError";
import { getAllOffersType, offerCard, OfferNotification } from "@/types/types";
import { Profile } from "@/types/BusinessEntities/Profile";
import { mapServiceCardFromApi } from "../ServiceDAO";

const mapOfferCardFromApi = (data): offerCard => {
  return {
    id: data.id || "",
    name: data.name || "",
    resume: data.resume || "",
    description: data.description || "",
    tags: data.tags || [],
    price: data.price || "",
    calification: data.calification || "",
    owner_id: data.owner_id.id || "",
    worker_id: data.worker_id || "",
    offer_type: data.offer_type || "",
    in_progress: data.in_progress || "",
    created_at: data.created_at || "",
    profile: {
      name: data.owner_id.name || "",
      last_name: data.owner_id?.last_name || "",
      picture: data.owner_id?.picture || "",
    },
  };
};

const mapOfferFromApi = (data): Offer => {
  return {
    ...data,
  };
};

const getOffers = async (params): Promise<Array<offerCard>> => {
  const { id } = params.queryKey[1];
  const data = await supabase
    .from("offers")
    .select("*, owner_id (id, name, last_name, picture)")
    .or(`owner_id.eq.${id},worker_id.eq.${id}`)
    .eq("in_progress", true)
    .then(handleSupabaseError)
    .then(({ data }) => data.map(mapOfferCardFromApi));

  console.log(data);
  console.log("fetching from supabase");
  return data;
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

const offersQuery = `*, owner_id (id, name, last_name, picture)`;

const getAllOffers = async (): Promise<getAllOffersType> => {
  const offers = await supabase
    .from("offers")
    .select(offersQuery)
    .eq("offer_type", "public")
    .then(handleSupabaseError)
    .then(({ data }) => data.map(mapOfferCardFromApi));

  const services = await supabase
    .from("services")
    .select(offersQuery)
    .then(handleSupabaseError)
    .then(({ data }) => data.map(mapServiceCardFromApi));

  return {
    offers,
    services,
  };
};

const setOffer = async (offer: Offer): Promise<Offer> => {
  const { data, error } = await supabase.from("offers").upsert([{ ...offer }]);

  return mapOfferFromApi(data);
};

interface addWorkerToOfferType {
  offer_id: string;
  worker_id: string;
}

const addWorkerToOffer = async ({
  offer_id,
  worker_id,
}: addWorkerToOfferType) => {
  const data = await supabase
    .from("offers")
    .update({ worker_id, in_progress: true })
    .eq("id", offer_id);

  console.log(data);
};

export { getOffers, getAllOffers, getOfferById, setOffer, addWorkerToOffer };
