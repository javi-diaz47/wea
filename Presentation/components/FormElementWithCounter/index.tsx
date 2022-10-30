import { cloneElement } from "react";
import { InputWithLabel } from "../InputWithLabel";

interface Props {
  children: JSX.Element;
  className?: string;
  currentLength: number;
  maxLength: number;
}

const FormElementWithCounter = ({
  children,
  currentLength,
  maxLength,
  className,
}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      {cloneElement(children, {
        disabled: currentLength < maxLength ? false : true,
      })}
      <div className="flex justify-end px-2">
        <span>
          {currentLength}/{maxLength}
        </span>
      </div>
    </div>
  );
};
export { FormElementWithCounter };
