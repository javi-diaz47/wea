const FormElement = (props) => {
  const { name, label, className, children } = props;
  return (
    <div className="flex gap-4">
      <label htmlFor={name} className="text-white">
        {label}
      </label>
      {!!children && children}
      {!children && (
        <input
          {...props}
          className={
            className ?? "border-2 border-rose-500 bg-transparent text-white"
          }
        />
      )}
      {/* <input
        {...props}
        className={
          className ?? 'border-2 border-rose-500 bg-transparent text-white'
        }
      /> */}
    </div>
  );
};

export { FormElement };
