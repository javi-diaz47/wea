import { getDateFormat } from "Logic/utils/getDateFormat";
import { ProfileUser } from "../ProfileUser";

const ProfileUserWithDate = ({ name, last_name, href, date }) => {
  return (
    <ProfileUser name={name} last_name={last_name} href={href}>
      <span className="capitalize">{getDateFormat(date)}</span>
    </ProfileUser>
  );
};
export { ProfileUserWithDate };
