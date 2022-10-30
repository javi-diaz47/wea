import { useState } from "react";
import { FormElement } from "@/components/FormElement";
import { Footer } from "@/components/Footer";
import { signUpUser } from "@/utils/auth";
import { MIN_PASSWORD_LENGTH, USER_TYPES } from "@/utils/constants";
import { Modal } from "@/components/Modal";
import { useModal } from "@/hooks/useModal";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/outline";
import Router from "next/router";

export default function signUp() {
  const [userType, setUserType] = useState(USER_TYPES.PERSON);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const { modalOpen, open, close, renderModal } = useModal(false);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const htmlFormData = new FormData(ev.target);
    const inputObject = Object.fromEntries(htmlFormData);
    const error = await signUpUser(inputObject);
    console.log(error);
    if (error) {
      setError(true);
      open();
    }
    if (!error) {
      Router.push("login");
      open();
    }
  };

  const onChangeUserType = (ev) => {
    setUserType(ev.target.value);
  };

  return (
    <div className="  flex flex-col  items-center  relative">
      {renderModal({
        condition: modalOpen && !!error,
        modal: (
          <Modal
            title="Error al crear cuenta"
            text="Tenemos problemas con el servidor, intenta mas tarde"
            handleClose={close}
            icon={<XCircleIcon className="w-12 h-12 text-love" />}
          />
        ),
      })}
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
