import { useState } from "react";
import { FormElement } from "@/components/FormElement";
import { Footer } from "@/components/Footer";
import { signUpUser } from "@/utils/auth";
import { MIN_PASSWORD_LENGTH, USER_TYPES } from "@/utils/constants";
import { Wea } from "../components/Icons/Wea";

export default function signUp() {
  const [userType, setUserType] = useState(USER_TYPES.PERSON);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const htmlFormData = new FormData(ev.target);
    const inputObject = Object.fromEntries(htmlFormData);
    signUpUser(inputObject);
    setSubmitted(true);
  };

  const onChangeUserType = (ev) => {
    setUserType(ev.target.value);
  };

  if (submitted) {
    return (
      <div className=" bg-black flex justify-center items-center text-white">
        <h2>Revisa tu correo electronico</h2>
      </div>
    );
  }

  return (
    <div className="  flex flex-col  items-center  relative">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-8 mt-8">
          <h1 className="text-3xl">Registrate</h1>
        </div>

        <FormElement label="Nombre" name="name" required={true} />
        <FormElement label="Apellido" name="lastName" />
        <FormElement label="Correo" name="email" type="email" required={true} />
        <FormElement
          label="Contraseña"
          name="password"
          type="password"
          required={true}
          minLength={MIN_PASSWORD_LENGTH}
        />
        <div className="flex justify-center">
          <button className="bg-primary text-white p-2 rounded-lg hover:bg-white bold text-lg hover:text-black duration-300 shadow-xl">
            Crear cuenta
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
}
