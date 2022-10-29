import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { Layout } from "@/components/Layout";
import "@/styles/globals.css";
import { checkUser, handleAuthChange } from "@/utils/auth";
import { supabase } from "@/utils/supabaseClient";
import { ReactQueryDevtools } from "react-query/devtools";

function MyApp({ Component, pageProps }) {
  const [authenticatedState, setAuthenticatedState] = useState(null);
  const router = useRouter();

  const queryClient = new QueryClient();

  useEffect(() => {
    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((event, session) => {
      handleAuthChange(event, session);

      //redirect the user signed from the magiclink to the profile page
      if (event === "SIGNED_IN") {
        setAuthenticatedState("authenticated");
        // router.push('/profile');
      }

      if (event === "SIGNED_OUT") {
        setAuthenticatedState("not-authenticated");
      }
    });

    checkUser(setAuthenticatedState);

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Layout isAuth={authenticatedState === "authenticated" ? true : false}>
          <Component {...pageProps} />
        </Layout>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
