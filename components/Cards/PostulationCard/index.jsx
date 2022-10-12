import { CardTemplate } from '../CardTemplate';

const PostulationCard = ({ offer }) => {
  return (
    <CardTemplate offer={offer}>
      <div className="flex justify-between gap-4">
        <button className=" border border-primary text-primary h-fit py-1 px-3 rounded-lg shadow-sm hover:bg-primary hover:text-white duration-200">
          Ver postulaciones
        </button>
      </div>
    </CardTemplate>
  );
};

export { PostulationCard };
