import { FormElement } from "../FormElement";

const InputWithCounter = ({
  currentLength,
  maxLength,
  value,
  list,
  onChange,
  className,
  placeholder,
}) => {
  return (
    <div>
      <FormElement
        placeholder={placeholder}
        list={list}
        value={value}
        onChange={onChange}
        className={className}
        disabled={currentLength < maxLength ? false : true}
      />
      <span>
        {currentLength}/{maxLength}
      </span>
    </div>
  );
};

export { InputWithCounter };
