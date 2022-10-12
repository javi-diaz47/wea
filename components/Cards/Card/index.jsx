const Card = ({ children }) => {
  return (
    <div className="bg-white rounded-xl p-4 flex flex-col gap-4">
      {children}
    </div>
  );
};

export { Card };
