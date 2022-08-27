import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { signOut } from '../utils/auth';
import { fetchProfile } from '../utils/fetchProfile';

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

  return (
    <div className="h-screen bg-black flex flex-col justify-center align-center text-white">
      <h2 className="text-3xl text-blue-600">Profile</h2>
      <p className="text-xl">{profile.email}</p>
      <p className="text-xl">{profile.id}</p>
      <button
        className="hover:bg-white hover:text-blue-600 w-24 bg-blue-600 rounded-lg"
        onClick={handleSignOut}
      >
        Sign out
      </button>
    </div>
  );
}
