import { Offer } from "@/types/BusinessEntities/Offer";
import { supabase } from "Logic/utils/supabaseClient";
import { handleSupabaseError } from "Logic/utils/handleSupabaseError";
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
    owner_id: data?.owner_id?.id || "",
    worker_id: data?.worker_id || "",
    offer_type: data.offer_type || "",
    in_progress: data.in_progress || "",
    created_at: data.created_at || "",
    profile: {
      name: data?.owner_id?.name || "",
      last_name: data?.owner_id?.last_name || "",
      picture: data?.owner_id?.picture || "",
      calification: data?.worker_id?.calification || "",
    },
    worker: {
      name: data?.worker_id?.name || "",
      last_name: data?.worker_id?.last_name || "",
      picture: data?.worker_id?.picture || "",
      calification: data?.worker_id?.calification || "",
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
  let data = await supabase
    .from("offers")
    .select("*, owner_id (id, name, last_name, picture)")
    .or(`owner_id.eq.${id},worker_id.eq.${id}`)
    .or(`in_progress.eq.in-progress`)
    .then(handleSupabaseError)
    .then(({ data }) => data.map(mapOfferCardFromApi));

  // console.log(data);

  console.log(data);
  console.log("fetching from supabase");
  return data || [];

  // return [mapOfferCardFromApi({})];
};

const mapOfferFromOfferCard = (offer: offerCard): Offer => {
  return {
    id: offer.id,
    name: offer.name,
    resume: offer.resume,
    description: offer.description,
    tags: offer.tags,
    price: offer.price,
    calification: offer.calification,
    owner_id: offer.owner_id,
    worker_id: offer.worker_id,
    offer_type: offer.offer_type,
    in_progress: offer.in_progress,
    created_at: offer.created_at,
  };
};

const getOfferById = async (params): Promise<offerCard> => {
  const { id } = params.queryKey[1];
  const data = await supabase
    .from("offers")
    .select(
      "*, owner_id (id, name, last_name, picture), worker_id (id, name, last_name, picture, calification)"
    )
    .eq("id", id)
    .limit(1)
    .single()
    .then(handleSupabaseError)
    .then(({ data }) => mapOfferCardFromApi(data));

  console.log("fetching from supabase");
  return data;
};

const offersQuery = `*, owner_id (id, name, last_name, picture), worker_id  (id, name, last_name, picture, calification)`;
const serviceQuery = `*, owner_id (id, name, last_name, picture)`;

const getAllOffers = async (): Promise<getAllOffersType> => {
  let offers = await supabase
    .from("offers")
    .select(offersQuery)
    .eq("offer_type", "public")
    .or(`in_progress.eq.not-in-progress`)
    .then(handleSupabaseError)
    .then(({ data }) => data.map(mapOfferCardFromApi));

  let services = await supabase
    .from("services")
    .select(serviceQuery)
    .then(handleSupabaseError)
    .then(({ data }) => data.map(mapServiceCardFromApi));

  if (offers && services) {
    return {
      offers: offers,
      services: services,
    };
  }

  if (offers === undefined) {
    offers = [];
  }

  if (services === undefined) {
    services = [];
  }
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
    .update({ worker_id, in_progress: "in-progress" })
    .eq("id", offer_id);

  console.log(data);
};

export {
  getOffers,
  getAllOffers,
  getOfferById,
  setOffer,
  addWorkerToOffer,
  mapOfferFromOfferCard,
};
