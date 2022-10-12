import { ProfileUser } from '../ProfileUser';
import { StarIcon } from '@heroicons/react/solid';

const ProfileUserWithStar = ({ name, last_name, href, star }) => {
  return (
    <ProfileUser name={name} last_name={last_name} href={href}>
      <div className="flex">
        <p className="text-gold font-bold">{star}</p>
        <StarIcon className="w-6 h-6 text-gold" />
      </div>
    </ProfileUser>
  );
};
export { ProfileUserWithStar };
