import { FormElement } from "../FormElement";

const InputWithCounter = ({
  label,
  currentLength,
  maxLength,
  value,
  list,
  onChange,
  className,
  placeholder,
}) => {
  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <input
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
