import Link from 'next/link';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import { ReactMarkdownTitle } from '../ReactMarkdownTitle';

const OfferPost = ({ offer }) => {
  const getDateFormat = (date) => {
    const d = new Date(date);
    return ` 
    ${d.toLocaleDateString('es', { month: 'short' })} ${d.toLocaleDateString(
      'es',
      { day: 'numeric' }
    )}`;
  };
  const { id, title, resume, description, created_at, profiles } = offer;
  return (
    <div className="bg-white rounded-xl p-4 flex flex-col gap-4">
      <ReactMarkdownTitle
        title={title}
        className={' text-2xl font-semibold text-title hover:underline'}
      />
      {/* <ReactMarkdown
        children={resume}
        remarkPlugins={[remarkGfm]}
        className="offer-post"
      /> */}
      <p className="text-ellipsis whitespace-nowrap text-lg overflow-hidden">
        {resume}
      </p>

      <ul className="flex flex-wrap gap-2">
        <li className=" w-fit py-1 px-3  font-semibold rounded-full bg-tag-bg text-color-text-2 shadow">
          <span>#reactjs</span>
        </li>
        <li className=" w-fit py-1 px-3  font-semibold rounded-full bg-tag-bg text-color-text-2 shadow">
          <span>#javascript</span>
        </li>
      </ul>

      <div className="flex justify-between gap-4">
        <div className="flex gap-4">
          <Link href={`profiles/${offer.owner_id}`}>
            <a>
              <div className="w-12 h-12 rounded-full bg-slate-300"></div>
            </a>
          </Link>
          <div className="flex flex-col">
            <span>
              <strong>{profiles?.name}</strong> {profiles?.last_name}
            </span>
            <span className="capitalize">{getDateFormat(created_at)}</span>
          </div>
        </div>
        <div className="flex items-center">
          <Link href={`offers/${id}`}>
            <a className=" border border-love text-love h-fit py-1 px-3 rounded-full shadow hover:bg-love hover:text-white">
              Ver oferta
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export { OfferPost };
