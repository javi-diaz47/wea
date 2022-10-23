const FormElement = (props) => {
  const { name, label, className, children } = props;
  return (
    <div className="my-6">
      <label htmlFor={name} className="text-white">
        {label}
      </label>
      {!!children && children}
      {!children && (
        <input
          {...props}
          className={
            className ??
            "border-2 border-gray-300 bg-transparent text-white w-full focus:outline-none rounded"
          }
        />
      )}
    </div>
  );
};

export { FormElement };
