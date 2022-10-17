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

export default function ProfileId(props) {
  const router = useRouter();
  console.log(props);
  const { profile } = props;
  return (
    <div className="h-screen bg-background px-8 py-8 flex flex-col gap-7">
      <div className="flex items-center flex-col">
        <ProfilePhoto href="./" width="w-24" height="h-24" />
        <div className="text-2xl">
          <strong>{profile?.name || ''}</strong> {profile?.last_name || ''}
        </div>
      </div>

      <div className="flex justify-between">
        <div>
          <p>Miembro desde</p>
          <strong>{getDateFormat(profile?.inserted_at)}</strong>
        </div>
        <div>
          <p>Calificación</p>
          <div className="text-gold flex font-semibold">
            <strong>{profile?.calification || '5'}</strong>
            <StarIcon className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div>
        <p className="text-center">{profile?.resume}</p>
      </div>

      <section className="">
        <Collabs
          title="¿Quién soy?"
          icon={<UserIcon className="w-6 h-6 text-primary" />}
          desc={profile?.who_am_i}
        />
        <Collabs
          title="Mis Servicios"
          icon={<ClipboardListIcon className="w-6 h-6 text-primary" />}
          desc={profile?.resume}
        />
        <Collabs
          title="Contactame"
          icon={<PhoneIcon className="w-6 h-6 text-primary" />}
          desc={profile?.contact_me}
        />
      </section>
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
