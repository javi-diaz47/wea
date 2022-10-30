import { useRouter } from "next/router";
import { signOut } from "Logic/utils/auth";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import { LogoutIcon } from "@heroicons/react/outline";
import { Collabs } from "Presentation/components/Collabs";
import { ProfilePagePhoto } from "Presentation/components/Profile/ProfilePage/ProfileUserWithName";
import { ProfileDateAndCalification } from "Presentation/components/Profile/ProfilePage/ProfileDateAndCalification";
import { ProfileInformation } from "Presentation/components/Profile/ProfilePage/ProfileInformation";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getProfileById } from "@/Persistence/UserDAO";
import { AnchorButton } from "@/components/AnchorButton";
import Link from "next/link";

export default function Profile({ queryKey }) {
  const router = useRouter();

  const {
    data: { profile, offers, services },
  } = useQuery(queryKey, getProfileById);

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
  console.log({
    profile,
    offers,
    services,
  });
  return (
    <div className=" bg-background px-8 py-8 flex flex-col gap-7">
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
        offers={offers}
        services={services}
        allow={true}
      >
        <div className="flex flex-col justify-start text-lg  align-center">
          <button
            className="flex justify-start gap-4 font-normal"
            onClick={handleSignOut}
          >
            <LogoutIcon className="w-6 h-6 text-love" />
            Cerrar Sesión
          </button>
        </div>
      </ProfileInformation>
      <Link href="/profile/edit">
        <a className=" border border-primary text-primary h-fit py-1 px-3 rounded-full text-center shadow-sm hover:bg-primary hover:text-white duration-200">
          Editar perfil
        </a>
      </Link>
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
