import { useState } from 'react';
import { Input } from '../components/Input';
import { signUpUser } from '../utils/auth';
import { MIN_PASSWORD_LENGTH, USER_TYPES } from '../utils/constants';

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
      <div className="h-screen bg-black flex justify-center items-center text-white">
        <h2>Revisa tu correo electronico</h2>
      </div>
    );
  }

  return (
    <div className="h-screen bg-black flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-8">
          <Input
            label="Persona"
            name="userType"
            type="radio"
            value={USER_TYPES.PERSON}
            checked={true}
            required={true}
            onChange={onChangeUserType}
          />

          <Input
            label="Empresa"
            name="userType"
            type="radio"
            value={USER_TYPES.ENTERPRISE}
            required={true}
            onChange={onChangeUserType}
          />
        </div>

        <Input label="Nombre" name="name" required={true} />
        {userType === USER_TYPES.PERSON ? (
          <Input label="Apellido" name="lastName" required={true} />
        ) : (
          <Input label="NIT" name="nit" required={true} type="number" />
        )}
        <Input label="Correo" name="email" type="email" required={true} />
        <Input
          label="Contraseña"
          name="password"
          type="password"
          required={true}
          minlength={MIN_PASSWORD_LENGTH}
        />

        <button className="bg-white p-2 rounded-lg hover:bg-blue-600 bold text-lg hover:text-white duration-300">
          Crear cuenta
        </button>
      </form>
    </div>
  );
}
