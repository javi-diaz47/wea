import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

const ReactMarkdownTitle = ({ title, className }) => {
  return <ReactMarkdown children={`# ${title}`} className={className} />;
};

export { ReactMarkdownTitle };
