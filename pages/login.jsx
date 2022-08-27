export default function SignIn() {
  const handdleSubmit = (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const inputObject = Object.fromEntries(formData);
    console.log(inputObject);
  };

  return (
    <div className="h-screen bg-black flex justify-center items-center">
      <form
        onSubmit={handdleSubmit}
        className="bg-white p-4 rounded-xl gap-4 max-w-2xl min-h-48 flex flex-col "
      >
        <h2 className="text-2xl text-center mb-4">Ingresar</h2>
        <input name="email" placeholder="micorreo@correo.com" type="email" />
        <button
          className="hover:bg-blue-600 hover:text-white bold duration-300 rounded-3xl"
          type="submit"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}
