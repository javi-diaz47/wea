import Link from 'next/link';

export default function Offers() {
  return (
    <div className="bg-black h-screen">
      <h2 className="text-2xl font-bold text-white">This is the Offers Page</h2>
      <Link href="create-offer">
        <a className="text-white hover:bg-white hover:text-blue-600 m-w-24 p-2 font-bold bg-blue-600 rounded-lg">
          Crear oferta de trabajo
        </a>
      </Link>
    </div>
  );
}
