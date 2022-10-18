import { ProfilePhoto } from '../../ProfilePhoto';

const ProfilePagePhoto = ({ name, last_name, picture }) => {
  return (
    <div className="flex items-center flex-col">
      <ProfilePhoto href="./" width="w-24" height="h-24" />
      <div className="text-2xl w-48 text-center">
        <strong>{name || ''}</strong> {last_name || ''}
      </div>
    </div>
  );
};

export { ProfilePagePhoto };
