import { Offer } from "@/types/BusinessEntities/Offer";
import { supabase } from "Logic/utils/supabaseClient";
import { handleSupabaseError } from "Logic/utils/handleSupabaseError";
import {
  getAllOffersType,
  offerCard,
  OfferNotification,
  Review,
  reviewCard,
} from "@/types/types";
import { Profile } from "@/types/BusinessEntities/Profile";
import { mapServiceCardFromApi } from "../ServiceDAO";

const mapReviewCardFromApi = (data): reviewCard => {
  return {
    id: data.id || "",
    review: data.review || "",
    calification: data.calification || "",
    owner_id: data.owner_id.id || "",
    worker_id: data.worker_id || "",
    offer_id: data.offer_id || "",
    created_at: data.created_at || "",
    profile: {
      name: data.owner_id.name || "",
      last_name: data.owner_id?.last_name || "",
      picture: data.owner_id?.picture || "",
    },
    worker: {
      name: data.owner_id.name || "",
      last_name: data.owner_id?.last_name || "",
      picture: data.owner_id?.picture || "",
      calification: data.owner_id.calification || "",
    },
  };
};

const mapOfferFromApi = (data): Review => {
  return {
    ...data,
  };
};

const getReview = async (params): Promise<Array<reviewCard>> => {
  const { id } = params.queryKey[1];
  const data = await supabase
    .from("reviews")
    .select("*, owner_id (id, name, last_name, picture)")
    .or(`owner_id.eq.${id},worker_id.eq.${id}`)
    .eq("in_progress", true)
    .then(handleSupabaseError)
    .then(({ data }) => data.map(mapReviewCardFromApi));

  console.log(data);
  console.log("fetching from supabase");
  return data;
};

const mapReviewFromReviewCard = (offer: reviewCard): Review => {
  return {
    id: offer.id,
    review: offer.review,
    calification: offer.calification,
    owner_id: offer.owner_id,
    worker_id: offer.worker_id,
    offer_id: offer.offer_id,
    created_at: offer.created_at,
  };
};

const mapReviewFromApi = (data): Review => {
  return {
    ...data,
  };
};

const getOfferById = async (params): Promise<reviewCard> => {
  const { id } = params.queryKey[1];
  const data = await supabase
    .from("reviews")
    .select("*, owner_id (id, name, last_name, picture)")
    .eq("id", id)
    .limit(1)
    .single()
    .then(handleSupabaseError)
    .then(({ data }) => mapReviewCardFromApi(data));

  console.log("fetching from supabase");
  return data;
};

const offersQuery = `*, owner_id (id, name, last_name, picture), worker_id  (id, name, last_name, picture, calification)`;

const setReview = async (offer: Review): Promise<Review> => {
  const { data, error } = await supabase.from("reviews").upsert([{ ...offer }]);

  return mapReviewFromApi(data);
};

export { getReview, getOfferById, setReview };
