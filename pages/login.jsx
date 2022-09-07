import { useState } from 'react';
import { Input } from '../components/Input';
import { signIn } from '../utils/auth';
import { MIN_PASSWORD_LENGTH } from '../utils/constants';

export default function Login() {
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const htmlFormData = new FormData(ev.target);
    const inputObject = Object.fromEntries(htmlFormData);
    signIn(inputObject);
    setSubmitted(true);
  };

  return (
    <div className="h-screen bg-black flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <h2 className="text-white text-2xl text-center mb-4">Ingresar</h2>
        <Input label="Correo" name="email" type="email" required={true} />
        <Input
          label="Contraseña"
          name="password"
          type="password"
          required={true}
          minlength={MIN_PASSWORD_LENGTH}
        />

        <button
          className="hover:text-white p-2 hover:bg-rose-600 bg-white bold duration-300 rounded-lg"
          type="submit"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}
