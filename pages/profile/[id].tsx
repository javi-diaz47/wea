import Link from "next/link";
import { supabase } from "Logic/utils/supabaseClient";
import { useRouter } from "next/router";
import { ProfilePagePhoto } from "Presentation/components/Profile/ProfilePage/ProfileUserWithName";
import { ProfileDateAndCalification } from "Presentation/components/Profile/ProfilePage/ProfileDateAndCalification";
import { ProfileInformation } from "Presentation/components/Profile/ProfilePage/ProfileInformation";
import { getProfileById } from "Persistence/UserDAO";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";

export default function ProfileId({ queryKey, allow }) {
  const router = useRouter();

  const {
    data: { profile, services, offers },
  } = useQuery(queryKey, getProfileById);

  return (
    <div className="h-screen bg-background px-8 py-8 flex flex-col gap-7">
      <ProfilePagePhoto
        name={profile?.name}
        last_name={profile?.last_name}
        picture={profile?.picture}
      />

      <ProfileDateAndCalification
        date={profile?.inserted_at}
        calification={profile?.calification}
      />

      <div>
        <p className="text-center">{profile?.resume}</p>
      </div>

      <ProfileInformation
        who_am_i={profile?.who_am_i}
        resume={profile?.resume}
        contact_me={profile?.contact_me}
        offers={offers}
        services={services}
        allow={allow}
      />

      <Link href={`/create-offer/${profile.id}`}>
        <a className="bg-primary rounded-full w-fit py-2 px-6 self-center mb-8">
          Proponer trabajo
        </a>
      </Link>
    </div>
  );
}

export async function getServerSideProps({ req, res, params }) {
  const { id } = params;

  const token = getCookie("token", { req, res });
  const current_profile_id = jwt.decode(token).sub;

  if (id === current_profile_id) {
    return {
      redirect: {
        destination: "/profile",
      },
    };
  }

  const queryClient = new QueryClient();

  const queryKey = ["profile", { id }];

  const { data, error } = await supabase
    .from("offers")
    .select("*")
    .or(`worker_id.eq.${id},owner_id.eq.${id}`)
    .or(`worker_id.eq.${current_profile_id},owner_id.eq.${current_profile_id}`);

  console.log(data);

  await queryClient.prefetchQuery(queryKey, getProfileById);

  return {
    props: {
      allow: data.length !== 0 ? true : false,
      queryKey,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export async function getServerSidePaths() {
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("id");

  return {
    paths: profiles.map((profile) => ({
      params: {
        id: `${profile.id}`,
      },
    })),
    fallback: false,
  };
}
