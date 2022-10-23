import { FormElement } from "../components/FormElement";
import { Facebook } from "../components/Icons/facebook";
import { signIn } from "../utils/auth";
import { MIN_PASSWORD_LENGTH } from "../utils/constants";
import { Footer } from "../components/Footer";

export default function Login() {
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const htmlFormData = new FormData(ev.target);
    const inputObject = Object.fromEntries(htmlFormData);
    signIn(inputObject);
  };
  return (
    <div className=" bg-black flex justify-center">
      <form onSubmit={handleSubmit}>
        <div className="mt-11">
          <h2 className="text-white text-2xl mb-4">Ingresar</h2>
          <p className="text-white mb-5">
            Bienvenido a WEA, ingresa tus datos para iniciar sesión
          </p>
        </div>
        <div>
          <FormElement
            label="Correo"
            name="email"
            type="email"
            placeholder=""
            required={true}
          />
          <FormElement
            label="Contraseña"
            name="password"
            type="password"
            required={true}
            minLength={MIN_PASSWORD_LENGTH}
          />
        </div>
        <div className=" flex justify-center">
          <button
            className="hover:text-white p-2 hover:bg-blue-600 bg-white bold duration-300 rounded-lg  mx-auto w-fit px-7"
            type="submit"
          >
            Iniciar sesión
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
}
