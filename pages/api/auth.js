import { deleteCookie, setCookie } from 'cookies-next';

// Set and clear the cookie
export default async function handler(req, res) {
  const cookieOptions = {
    req,
    res,
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  };

  if (req.method === 'POST') {
    setCookie('token', req.body.session.access_token, cookieOptions);
  }

  if (req.method === 'DELETE') {
    deleteCookie('token', cookieOptions);
  }

  res.send();
}
