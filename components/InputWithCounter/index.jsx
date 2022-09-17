import { FormElement } from '../FormElement';

const InputWithCounter = ({
  currentLength,
  maxLength,
  value,
  onChange,
  className,
}) => {
  return (
    <div>
      <FormElement
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
