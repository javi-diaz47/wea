import { supabase } from '../../utils/supabaseClient';

export default function ProfileId({ profile }) {
  return <div>{profile?.name}</div>;
}

export async function getStaticProps({ params }) {
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', params.id);
  return {
    props: {
      profile: profile[0],
    },
  };
}

export async function getStaticPaths() {
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('id');

  return {
    paths: profiles.map((profile) => ({
      params: {
        id: `${profile.id}`,
      },
    })),
    fallback: false,
  };
}
