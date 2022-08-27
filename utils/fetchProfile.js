import { supabase } from '../utils/supabaseClient';

// setProfile function to set the state to profile
// router to redirect the user
export const fetchProfile = async (setProfile, router) => {
  // if there a signed user return the profile
  const profileData = await supabase.auth.user();
  if (!profileData) {
    router.push('/login');
  } else {
    setProfile(profileData);
  }
};
