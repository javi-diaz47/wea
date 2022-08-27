import { supabase } from '../utils/supabaseClient';

export const signInWithEmail = async (email) => {
  try {
    const { user, error } = await supabase.auth.signUp({
      email,
    });

    if (error) throw error;

    return user;
  } catch (err) {
    console.error(err);
  }
};
