import { deleteCookie, getCookie, getCookies, setCookie } from "cookies-next";
import jws from "jsonwebtoken";

// Set and clear the cookie
export default async function handler(req, res) {
  const cookieOptions = {
    req,
    res,
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  if (req.method === "GET") {
    const token = getCookie("token", cookieOptions);
    res.status(200).json({ id: jws.decode(token).sub });
  }

  if (req.method === "POST") {
    setCookie("token", req.body.session.access_token, cookieOptions);
  }

  if (req.method === "DELETE") {
    deleteCookie("token", cookieOptions);
  }

  res.send();
}
