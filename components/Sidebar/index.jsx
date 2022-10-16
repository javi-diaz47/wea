const Sidebar = ({ children, open, leftRight = true }) => {
  const onSidebar = () => {
    if (leftRight) {
      return open ? 'left-0' : '-left-full';
    }
    return open ? 'right-0' : '-right-full';
  };

  return (
    <div
      className={`fixed w-full h-full duration-500 ease-in-out z-10 bg-background
        flex flex-col justify-center gap-10 items-center shadow-md
        ${onSidebar()}
      `}
    >
      {children}
    </div>
  );
};

export { Sidebar };
