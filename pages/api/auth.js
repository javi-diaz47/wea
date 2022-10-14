import { supabase } from '../../utils/supabaseClient';
import { setCookie } from 'cookies-next';

// Set and clear the cookie
export default function handler(req, res) {
  // supabase.auth.api.setAuthCookie(req, res);A
  console.log(req.body.session);
  setCookie('token', req.body.session.access_token, {
    req,
    res,
    httpOnly: true,
    sameSite: 'none',
  });
  res.send();
}
