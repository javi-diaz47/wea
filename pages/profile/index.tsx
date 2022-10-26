import { useRouter } from "next/router";
import { signOut } from "@/utils/auth";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import { LogoutIcon } from "@heroicons/react/outline";
import { Collabs } from "@/components/Collabs";
import { ProfilePagePhoto } from "@/components/ProfilePage/ProfileUserWithName";
import { ProfileDateAndCalification } from "@/components/ProfilePage/ProfileDateAndCalification";
import { ProfileInformation } from "@/components/ProfilePage/ProfileInformation";
import { dehydrate, QueryCache, QueryClient, useQuery } from "react-query";
import { getProfileById } from "@/Persistence/UserDAO";

export default function Profile({ queryKey }) {
  const router = useRouter();

  const { data: profile } = useQuery(queryKey, getProfileById);

  const handleSignOut = () => {
    signOut();
    router.push("/login");
  };

  // const handleSubmit = (ev) => {
  //   ev.preventDefault();
  //   const htmlFormData = new FormData(ev.target);
  //   const inputObject = Object.fromEntries(htmlFormData);
  //   console.log(inputObject);
  //   updateProfileBio(profile?.id, inputObject);
  // };

  return (
    <div className="h-screen bg-background px-8 py-8 flex flex-col gap-7">
      <ProfilePagePhoto
        name={profile.name}
        last_name={profile?.last_name}
        picture={profile.picture}
      />

      <ProfileDateAndCalification
        date={profile.inserted_at}
        calification={profile?.calification}
      />

      <div>
        <p className="text-center">{profile?.resume}</p>
      </div>

      <ProfileInformation
        who_am_i={profile?.who_am_i}
        resume={profile?.resume}
        contact_me={profile?.contact_me}
      >
        <Collabs
          title="Cerrar Sesión"
          icon={<LogoutIcon className="w-6 h-6 text-love" />}
          desc={profile?.who_am_i}
          onClick={handleSignOut}
        />
      </ProfileInformation>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  const token = getCookie("token", { req, res });
  const id = jwt.decode(token).sub;

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
