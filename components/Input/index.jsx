const Input = (props) => {
  const {
    name,
    value,
    type,
    label,
    required,
    checked,
    onChange,
    minlength,
    maxlength,
  } = props;

  return (
    <div className="flex gap-4">
      <label htmlFor={name} className="text-white">
        {label}
      </label>
      <input
        name={name}
        defaultValue={value ? value : ''}
        type={type ? type : ''}
        className="border-2 border-rose-500 bg-transparent text-white"
        required={required}
        defaultChecked={checked}
        onChange={onChange}
        minLength={minlength}
        maxLength={maxlength}
      />
    </div>
  );
};

export { Input };
