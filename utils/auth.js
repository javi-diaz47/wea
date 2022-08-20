import { supabase } from '../utils/supabaseClient';

export const auth = async ({ email, password }) => {
  try {
    const { user, session, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    return {
      user,
      session,
    };
  } catch (err) {
    console.error(err);
  }
};
