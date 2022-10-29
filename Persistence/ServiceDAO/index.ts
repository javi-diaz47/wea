import { supabase } from "@/utils/supabaseClient";
import { handleSupabaseError } from "@/utils/handleSupabaseError";
import { Service } from "@/types/BusinessEntities/Service";
import { serviceCard } from "@/types/types";

const mapServiceCardFromApi = (data): serviceCard => {
  return {
    id: data.id,
    name: data.name,
    resume: data.resume,
    description: data.description,
    tags: data.tags,
    price: data.price,
    author_id: data.owner_id.id,
    created_at: data.created_at,
    profile: {
      name: data.author_id.name,
      last_name: data.author_id?.last_name,
      picture: data.author_id?.picture,
    },
  };
};

const mapServiceFromApi = (data): Service => {
  return {
    ...data,
  };
};

const getServiceById = async (params): Promise<serviceCard> => {
  const { id } = params.queryKey[1];
  const data = await supabase
    .from("services")
    .select("*, author_id (id, name, last_name, picture)")
    .eq("id", id)
    .limit(1)
    .single()
    .then(handleSupabaseError)
    .then(({ data }) => mapServiceCardFromApi(data));

  console.log("fetching from supabase");
  return data;
};

const setService = async (service: Service): Promise<Service> => {
  const { data, error } = await supabase
    .from("services")
    .upsert([{ ...service }]);

  return mapServiceFromApi(data);
};

export { getServiceById, setService };
