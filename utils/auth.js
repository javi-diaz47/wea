import { supabase } from '../utils/supabaseClient';

export const signInWithEmail = async (email) => {
  try {
    const { user, error } = await supabase.auth.signIn({
      email,
    });

    if (error) throw error;

    return user;
  } catch (err) {
    console.error(err);
  }
};

export const signOut = async () => {
  await supabase.auth.signOut();
};

// Call the auth api to set or remove the cookie of the user authentication
export const handleAuthChange = async (event, session) => {
  await fetch('api/auth', {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin',
    body: JSON.stringify({ event, session }),
  });
};

//Set the user authenticatedState if the user is authenticated
export const checkUser = async (setAuthenticatedState) => {
  // Check if user exist
  const user = await supabase.auth.user();
  if (user) {
    setAuthenticatedState('authenticated');
  }
};
