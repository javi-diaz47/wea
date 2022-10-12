import { ProfileUserWithDate } from '../../ProfileUserWithDate';
import { AnchorButton } from '../../AnchorButton';
import { CardTemplate } from '../CardTemplate';

const OfferCard = ({ offer }) => {
  const { id, title, resume, description, created_at, profiles, tags } = offer;
  console.log(title);
  return (
    <CardTemplate offer={offer}>
      <div className="flex justify-between gap-4">
        <div className="flex gap-4">
          <ProfileUserWithDate
            name={profiles.name}
            last_name={profiles?.last_name}
            href={`profile/${offer.owner_id}`}
            date={created_at}
          />
        </div>

        <div className="flex items-center">
          <AnchorButton href={`offers/${id}`} text="Ver oferta" />
        </div>
      </div>
    </CardTemplate>
  );
};

export { OfferCard };
