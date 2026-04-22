import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownProps = {
  content: string;
};

export function Markdown({ content }: MarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        img: ({ alt, ...props }) => <img {...props} alt={alt ?? ""} />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
