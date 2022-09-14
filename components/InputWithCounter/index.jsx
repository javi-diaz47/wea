const InputWithCounter = ({
  currentLength,
  maxLength,
  value,
  onChange,
  className,
}) => {
  return (
    <div>
      <input
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
