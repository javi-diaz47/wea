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
      <div className="flex justify-end px-2">
        <span>
          {currentLength}/{maxLength}
        </span>
      </div>
    </div>
  );
};

export { InputWithCounter };
