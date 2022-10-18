import { ProfilePhoto } from '../../components/ProfilePhoto';
import { Collabs } from '../../components/Collabs';
import { getDateFormat } from '../../utils/getDateFormat';
import { StarIcon } from '@heroicons/react/solid';
import {
  UserIcon,
  ClipboardListIcon,
  PhoneIcon,
  LogoutIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';
import { supabase } from '../../utils/supabaseClient';
import { useRouter } from 'next/router';
import { ProfilePagePhoto } from '../../components/ProfilePage/ProfileUserWithName';
import { ProfileDateAndCalification } from '../../components/ProfilePage/ProfileDateAndCalification';
import { ProfileInformation } from '../../components/ProfilePage/ProfileInformation';

export default function ProfileId(props) {
  const router = useRouter();
  console.log(props);
  const { profile } = props;

  return (
    <div className="h-screen bg-background px-8 py-8 flex flex-col gap-7">
      <ProfilePagePhoto
        name={profile.name}
        last_name={profile.last_name}
        picture={profile.picture}
      />

      <ProfileDateAndCalification
        date={profile.inserted_at}
        calification={profile.calification}
      />

      <div>
        <p className="text-center">{profile.resume}</p>
      </div>

      <ProfileInformation
        who_am_i={profile?.who_am_i}
        resume={profile?.resume}
        contact_me={profile?.contact_me}
      />

      <Link href={`${router.pathname}create-offer/${profile.id}`}>
        <a className="bg-primary rounded-full w-fit py-2 px-6 self-center">
          Proponer trabajo
        </a>
      </Link>
    </div>
  );
}

export async function getStaticProps({ params }) {
  // fetch for the offer information
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', params.id)
    .limit(1)
    .single();

  return {
    props: {
      profile,
    },
  };
}

export async function getStaticPaths() {
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('id');

  return {
    paths: profiles.map((profile) => ({
      params: {
        id: `${profile.id}`,
      },
    })),
    fallback: false,
  };
}
