import { supabase } from '../utils/supabaseClient';

export const signUpUser = async (data) => {
  const { name, lastName, email, password, userType, nit } = data;
  try {
    const { user, error } = await supabase.auth.signUp(
      { email, password },
      // Add user metadata
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

export const signIn = async ({ email, password }) => {
  try {
    const { user, session, error } = await supabase.auth.signIn({
      email,
      password,
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
  if (event === 'SIGNED_IN') {
    await fetch('api/auth', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event, session }),
    });
  }
  if (event === 'SIGNED_OUT') {
    await fetch('api/auth', {
      method: 'DELETE',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
    });
  }
};

//Set the user authenticatedState if the user is authenticated
export const checkUser = async (setAuthenticatedState) => {
  // Check if user exist
  const user = await supabase.auth.user();
  if (user) {
    setAuthenticatedState('authenticated');
  }
};
