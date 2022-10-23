import { supabase } from "../utils/supabaseClient";

export type queryKey_type = [string, { id: string }];

type Params = {
  queryKey: queryKey_type;
};

const handleSupabaseError = ({ error, ...rest }) => {
  if (error) {
    throw error;
  }
  return rest;
};

const getProfileById = async (params: Params): Promise<Profile> => {
  const { id } = params.queryKey[1];
  // const data = await supabase
  //   .from("profiles")
  //   .select("*")
  //   .eq("id", id)
  //   .limit(1)
  //   .single()
  //   .then(handleSupabaseError)
  //   .then(({ data }) => data);
  // console.log(id);

  const data: Profile = {
    id: "843edb12-63fa-4351-a549-d39d21b45199",
    inserted_at: "2022-09-07T01:37:28+00:00",
    updated_at: "2022-09-07T01:37:28+00:00",
    name: "Javier Eduardo ",
    last_name: "Perez Diaz",
    email: "javiereduardo300@gmail.com",
    resume:
      "Gravida neque convallis a cras semper auctor neque vitae tempus quam pellentesque nec nam aliquam sem et tortor consequa",
    who_am_i:
      "Take this kiss upon the brow! And, in parting from you now, Thus much let me avow — You are not wrong, who deem That my days have been a dream; Yet if hope has flown away In a night, or in a day, In a vision, or in none, Is it therefore the less gone? ",
    calification: 5,
    contact_me: "Email: javiereduardo300@gmail.com",
  };

  console.log("fetching from supabase");
  return data;
};

// const getProfiles = async (params: Params): Promise<Profiles> => {
//   const data = await supabase
//     .from("profiles")
//     .select("id")
//     .then(handleSupabaseError)
//     .then(({ data }) => data);

//   return data;
// };

export { getProfileById };
