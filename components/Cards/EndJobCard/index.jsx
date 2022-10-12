import { CardTemplate } from '../CardTemplate';

const EndJobCard = ({ offer }) => {
  return (
    <CardTemplate offer={offer}>
      <div className="flex justify-between gap-4">
        <button className=" border border-love text-love h-fit py-1 px-3 rounded-lg shadow-sm hover:bg-primary hover:text-white duration-200">
          Finalizar
        </button>
      </div>
    </CardTemplate>
  );
};

export { EndJobCard };
