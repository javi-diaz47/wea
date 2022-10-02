import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { signOut } from '../../utils/auth';
import { fetchProfile } from '../../utils/fetchProfile';
import { getUserType } from '../../utils/getUserType';
import { BIO_ROWS, MAX_BIO_LENGTH } from '../../utils/constants';
import { updateProfileBio } from '../../utils/updateProfile';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchProfile(setProfile, router);
  }, []);

  if (!profile) return null;

  const handleSignOut = () => {
    signOut();
    router.push('/login');
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const htmlFormData = new FormData(ev.target);
    const inputObject = Object.fromEntries(htmlFormData);
    console.log(inputObject);
    updateProfileBio(profile.id, inputObject);
  };

  return (
    <div className="h-screen bg-black text-white">
      <div className="flex items-end gap-4">
        <h2 className="text-4xl">{profile.user_metadata.name}</h2>
        <span>{getUserType(profile.user_metadata.user_type_id)}</span>
      </div>
      {/* <p className="text-xl">{profile.email}</p> */}
      {/* <p className="text-xl">{profile.id}</p> */}
      <form onSubmit={handleSubmit}>
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
      </form>
      <button
        className="hover:bg-white hover:text-blue-600 w-24 bg-blue-600 rounded-lg"
        onClick={handleSignOut}
      >
        Sign out
      </button>
    </div>
  );
}
