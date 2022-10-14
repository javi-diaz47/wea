import { getCookie } from 'cookies-next';
import { supabase } from '../utils/supabaseClient';
import jwt from 'jsonwebtoken';

export default function Protected({ user }) {
  return (
    <div className="text-2xl">
      <h2>
        Hi,
        <span className="text-blue-600"> {user.email} </span>
        from protected route 👋
      </h2>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  //Check if there an authenticated user cookie
  // const { user } = await supabase.auth.api.getUserByCookie(req);

  const token = getCookie('token', { req, res });

  console.log(token);
  //if not redirect the user to the login
  // if (!user) {
  //   return { props: {}, redirect: { destination: '/login' } };
  // }

  if (!token) {
    return { props: {}, redirect: { destination: '/login' } };
  }

  return { props: { user: jwt.decode(token) } };
}
