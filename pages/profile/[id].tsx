import Link from "next/link";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/router";
import { ProfilePagePhoto } from "@/Profile/ProfilePage/ProfileUserWithName";
import { ProfileDateAndCalification } from "@/Profile/ProfilePage/ProfileDateAndCalification";
import { ProfileInformation } from "@/Profile/ProfilePage/ProfileInformation";
import { getProfileById } from "Persistence/UserDAO";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";

export default function ProfileId({ queryKey }) {
  const router = useRouter();

  const { data: profile } = useQuery(queryKey, getProfileById);

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
      />

      <Link
        href={`${process.env.NEXT_PUBLIC_ROOT_URL}/create-offer/${profile.id}`}
      >
        <a className="bg-primary rounded-full w-fit py-2 px-6 self-center">
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

  await queryClient.prefetchQuery(queryKey, getProfileById);

  return {
    props: {
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
