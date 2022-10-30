import { conditionalClassName } from "Logic/utils/conditionalClassName";

interface Props {
  state: boolean;
  stateTrueText: string;
  stateFalseText: string;
  className?: string;
  classNameBtn?: string;
  classNameBtnSelected?: string;
  onState: () => void;
  onNotState: () => void;
}

const ConditionalBar = ({
  state,
  stateTrueText,
  stateFalseText,
  className,
  classNameBtn,
  classNameBtnSelected,
  onState,
  onNotState,
}: Props) => {
  return (
    <div className={`${className} flex gap-8 `}>
      <button
        className={`
        ${conditionalClassName({
          state: !state,
          className: classNameBtn,
          classNameAlt: classNameBtnSelected,
        })}  `}
        onClick={onState}
      >
        {stateTrueText}
      </button>
      <button
        className={`
        ${conditionalClassName({
          state,
          className: classNameBtn,
          classNameAlt: classNameBtnSelected,
        })}  `}
        onClick={onNotState}
      >
        {stateFalseText}
      </button>
    </div>
  );
};

export { ConditionalBar };
