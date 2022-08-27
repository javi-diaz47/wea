import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import '../styles/globals.css';
import { checkUser, handleAuthChange } from '../utils/auth';
import { supabase } from '../utils/supabaseClient';

function MyApp({ Component, pageProps }) {
  const [authenticatedState, setAuthenticatedState] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        handleAuthChange(event, session);

        //redirect the user signed from the magiclink to the profile page
        if (event === 'SIGNED_IN') {
          setAuthenticatedState('authenticated');
          router.push('/profile');
        }

        if (event === 'SIGNED_OUT') {
          setAuthenticatedState('not-authenticated');
        }
      }
    );

    checkUser(setAuthenticatedState);

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  return (
    <Layout isAuth={authenticatedState}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
