import { FormElement } from "@/components/FormElement";
import { signIn } from "@/utils/auth";
import { MIN_PASSWORD_LENGTH } from "@/utils/constants";
import { Footer } from "@/components/Footer";
import { MotionConfig } from "framer-motion";
import { motion } from "framer-motion";
import { useBooleanState } from "@/hooks/useBooleanState";
import { Modal } from "@/components/Modal";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { useRouter } from "next/router";
import { useModal } from "@/hooks/useModal";

export default function Login() {
  const [success, setSuccess] = useState(null);
  const { modalOpen, open, close, renderModal } = useModal();
  const router = useRouter();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const htmlFormData = new FormData(ev.target);
    const inputObject = Object.fromEntries(htmlFormData);
    const { data, error } = await signIn(inputObject);

    if (error) {
      setSuccess(false);
      open();
    }

    if (data) {
      console.log("");
      router.push("profile");
    }
  };

  return (
    <div className="  flex flex-col items-center md:mx-3 ">
      {renderModal({
        condition: modalOpen && !success,
        modal: (
          <Modal
            title="Error al iniciar sesion"
            text="Usuario o contrasenas incorrectos"
            handleClose={close}
            icon={<XCircleIcon className="w-12 h-12 text-love" />}
          />
        ),
      })}

      <form onSubmit={handleSubmit}>
        <div className="mt-11 mx-3">
          <h2 className="text-2xl mb-4 bold">Ingresar</h2>
          <p className="mb-5 text-lg">
            Bienvenido a WEA, ingresa tus datos para iniciar sesión
          </p>
        </div>
        <div className="mx-4">
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
        <div className=" flex justify-center mb-10">
          <button
            className="hover:text-white p-2 hover:bg-blue-400 bg-blue-600 bold duration-300 rounded-lg  mx-auto w-fit px-7 my-5"
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
