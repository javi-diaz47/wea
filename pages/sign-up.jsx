import { auth } from '../utils/auth';

export default function SignUp() {
  const handdleSubmit = (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const inputObject = Object.fromEntries(formData);
    const { user, session } = auth(inputObject);
    console.log(user);
  };

  return (
    <div className="h-screen bg-black flex justify-center items-center">
      <form
        onSubmit={handdleSubmit}
        className="bg-white p-4 rounded-xl gap-4 max-w-2xl min-h-48 flex flex-col "
      >
        <h2 className="text-2xl text-center mb-4">Registrar</h2>
        <input name="email" placeholder="micorreo@correo.com" type="email" />
        <input name="password" placeholder="password" type="password" />
        <button
          className="hover:bg-blue-600 hover:text-white bold duration-300 rounded-3xl"
          type="submit"
        >
          Registrame
        </button>
      </form>
    </div>
  );
}
