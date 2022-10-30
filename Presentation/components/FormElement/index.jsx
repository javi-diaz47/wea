const FormElement = (props) => {
  const { name, label, className, children } = props;
  return (
    <div className="my-8 space-y-3">
      <label htmlFor={name} className="text-lg">
        {label}
      </label>
      {!!children && children}
      {!children && (
        <input
          {...props}
          className={
            className ??
            "px-2 border-2 border-gray-300 bg-transparent w-full focus:outline-none rounded-md h-10  "
          }
        />
      )}
    </div>
  );
};

export { FormElement };
