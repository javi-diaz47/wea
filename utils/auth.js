import { supabase } from '../utils/supabaseClient';

export const signUpUser = async ({
  name,
  lastName,
  email,
  password,
  userType,
  nit,
}) => {
  try {
    const { user, error } = await supabase.auth.signUp(
      { email, password },
      {
        data: {
          name,
          last_name: lastName ? lastName : null,
          email,
          user_type_id: Number(userType),
          nit: nit ? nit : null,
        },
      }
    );

    if (error) throw error;

    console.log(user);
  } catch (err) {
    console.error(err);
  }
};

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

export const signInWithGoogle = async () => {
  try {
    const { user, session, error } = await supabase.auth.signIn({
      provider: 'google',
    });

    if (error) throw error;

    console.log(user);
    console.log(session);
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
