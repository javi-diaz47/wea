import { useState } from 'react';
import { signInWithEmail } from '../utils/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    signInWithEmail(email);
    setSubmitted(true);
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
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-xl gap-4 max-w-2xl min-h-48 flex flex-col "
      >
        <h2 className="text-2xl text-center mb-4">Ingresar</h2>
        <input
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          name="email"
          placeholder="micorreo@correo.com"
          type="email"
          required
        />
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
