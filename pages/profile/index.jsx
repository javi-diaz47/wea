import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { signOut } from '../../utils/auth';
import { fetchProfile } from '../../utils/fetchProfile';
import { getprofileType } from '../../utils/getUserType';
import { BIO_ROWS, MAX_BIO_LENGTH } from '../../utils/constants';
import { updateProfileBio } from '../../utils/updateProfile';
import { ProfilePhoto } from '../../components/ProfilePhoto';
import { getCookie } from 'cookies-next';
import jwt from 'jsonwebtoken';

import { StarIcon } from '@heroicons/react/solid';
import {
  UserIcon,
  ClipboardListIcon,
  PhoneIcon,
  LogoutIcon,
} from '@heroicons/react/outline';
import { supabase } from '../../utils/supabaseClient';
import { getDateFormat } from '../../utils/getDateFormat';
import { Collabs } from '../../components/Collabs';

export default function Profile({ profile }) {
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.push('/login');
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const htmlFormData = new FormData(ev.target);
    const inputObject = Object.fromEntries(htmlFormData);
    console.log(inputObject);
    updateProfileBio(profile?.id, inputObject);
  };

  return (
    <div className="h-screen bg-background px-8 py-8 flex flex-col gap-7">
      {/* <div className="flex items-end gap-4">
        <h2 className="text-4xl">{profile?.name || ''}</h2>
        <span>{getprofileType(profile?.user_type_id)}</span>
      </div> */}
      {/* <p className="text-xl">{profile.email}</p> */}
      {/* <p className="text-xl">{profile.id}</p> */}
      {/* <form onSubmit={handleSubmit}>
        <h3>Bio</h3>
        <textarea
          name="bio"
          className="resize-none p-2 bg-transparent border-2 border-rose-600 rounded-lg"
          rows={BIO_ROWS}
          maxLength={MAX_BIO_LENGTH}
        />
        <button className="p-2 bg-yellow-400 text-black font-bold rounded-lg hover:bg-rose-500 hover:text-white duration-200">
          Guardar cambios
        </button>
      </form> */}

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
        <Collabs
          title="Cerrar Sesión"
          icon={<LogoutIcon className="w-6 h-6 text-love" />}
          desc={profile?.whoamI}
          onClick={handleSignOut}
        />
      </section>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  // const token = getCookie('token', { req, res });

  // const { data: profile, error } = await supabase
  //   .from('profiles')
  //   .select('*')
  //   .eq('id', jwt.decode(token).sub)
  //   .limit(1)
  //   .single();

  // console.log(profile);

  const profile = {
    id: '843edb12-63fa-4351-a549-d39d21b45199',
    inserted_at: '2022-09-07T01:37:28+00:00',
    updated_at: '2022-09-07T01:37:28+00:00',
    name: 'Javier',
    last_name: 'Diaz',
    email: 'javiereduardo300@gmail.com',
    nit: null,
    user_type_id: '1',
    resume:
      'Gravida neque convallis a cras semper auctor neque vitae tempus quam pellentesque nec nam aliquam sem et tortor consequa',
    contact_me: 'Email: javiereduardo300@gmail.com',
    who_am_i:
      'Take this kiss upon the brow! And, in parting from you now, Thus much let me avow — You are not wrong, who deem That my days have been a dream; Yet if hope has flown away In a night, or in a day, In a vision, or in none, Is it therefore the less gone? ',
    calification: 5,
  };

  return { props: { profile } };
}
