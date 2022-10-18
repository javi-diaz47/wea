import { StarIcon } from '@heroicons/react/solid';
import { getDateFormat } from '../../../utils/getDateFormat';

const ProfileDateAndCalification = ({ date, calification }) => {
  return (
    <div className="flex justify-between">
      <div>
        <p>Miembro desde</p>
        <strong className="capitalize">{getDateFormat(date)}</strong>
      </div>
      <div>
        <p>Calificación</p>
        <div className="text-gold flex justify-end font-semibold">
          <strong>{calification || '5'}</strong>
          <StarIcon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export { ProfileDateAndCalification };
