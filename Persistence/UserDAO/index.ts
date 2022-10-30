import { Profile } from "@/types/BusinessEntities/Profile";
import { SupabaseClient } from "@supabase/supabase-js";
import { handleSupabaseError } from "Logic/utils/handleSupabaseError";
import { supabase } from "Logic/utils/supabaseClient";
import { getAllOffers } from "../OfferDAO";

const mapFromApi = (data) => {
  return {
    id: data.id,
    name: data.name,
  };
};

const getProfileById = async (params) => {
  const { id } = params.queryKey[1];

  const offers = await supabase
    .from("offers")
    .select("id, name")
    .eq("owner_id", id)
    .then(({ data }) => data.map(mapFromApi));

  const services = await supabase
    .from("services")
    .select("id, name")
    .eq("owner_id", id)
    .then(({ data }) => data.map(mapFromApi));

  if (id) {
    const data = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .limit(1)
      .single()
      .then(handleSupabaseError)
      .then(({ data }) => data);
    // return data;
    return {
      profile: data,
      offers: offers || [],
      services: services || [],
    };
  } else {
    const data = await supabase
      .from("profiles")
      .select("*")
      .limit(1)
      .single()
      .then(handleSupabaseError)
      .then(({ data }) => data);
    // return data;
    return {
      profile: data,
      offers: offers || [],
      services: services || [],
    };
  }
};

const getProfileId = async (): Promise<string> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/auth`, {
    method: "GET",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
  });

  const { id } = await res.json();

  return id;
};

const setProfile = async ({ id, resume, who_am_i, contact_me }) => {
  const { data, error } = await supabase
    .from("profiles")
    .update([
      {
        resume,
        who_am_i,
        contact_me,
      },
    ])
    .eq("id", id);
  return data;
};

export { getProfileById, getProfileId, setProfile };
