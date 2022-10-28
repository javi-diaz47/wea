import { ProfileUserWithDate } from "../../ProfileUserWithDate";
import { AnchorButton } from "../../AnchorButton";
import { CardTemplate } from "../CardTemplate";

const OfferCard = ({ offer, href, profile, children }) => {
  return (
    <CardTemplate offer={offer}>
      <div className="flex justify-between gap-4">
        <div className="flex gap-4">
          <ProfileUserWithDate
            name={profile.name}
            last_name={profile?.last_name}
            href={`profile/${profile.id}`}
            date={offer.created_at}
          />
        </div>

        <div className="flex items-center">
          <AnchorButton
            href={
              href
                ? href
                : `${process.env.NEXT_PUBLIC_ROOT_URL}/offers/${offer.id}`
            }
            text="Ver oferta"
          />
        </div>
      </div>

      {children}
    </CardTemplate>
  );
};

export { OfferCard };
