import { supabase } from '../../utils/supabaseClient';

// Set and clear the cookie
export default function handler(req, res) {
  supabase.auth.api.setAuthCookie(req, res);
}
