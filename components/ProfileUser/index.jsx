import { ProfilePhoto } from '../ProfilePhoto';

const ProfileUser = ({ name, last_name, href, children }) => {
  return (
    <div className="flex gap-4">
      <ProfilePhoto href={href} />
      <div className="flex flex-col w-32">
        <span>
          <strong>{name}</strong> {last_name}
        </span>
        {children}
      </div>
    </div>
  );
};

export { ProfileUser };
