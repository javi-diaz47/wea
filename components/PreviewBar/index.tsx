import { conditionalTextColor } from "@/utils/conditionalTextColor";

interface Props {
  state: boolean;
  className?: string;
  onStateTailwindColor?: string;
  onState: () => void;
  onNotState: () => void;
}

const PreviewBar = ({
  state,
  className,
  onStateTailwindColor,
  onState,
  onNotState,
}: Props) => {
  return (
    <div className={`${className} flex gap-8 `}>
      <button
        className={conditionalTextColor(
          !state,
          onStateTailwindColor ? onStateTailwindColor : "text-rose-500"
        )}
        onClick={onNotState}
      >
        Editar
      </button>
      <button
        className={conditionalTextColor(
          state,
          onStateTailwindColor ? onStateTailwindColor : "text-rose-500"
        )}
        onClick={onState}
      >
        Vista previa
      </button>
    </div>
  );
};

export { PreviewBar };
