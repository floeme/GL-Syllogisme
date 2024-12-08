import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"

const useMarkdown = (path: string) => {
    const [content, setContent] = useState("");

    useEffect(() => {
      fetch(path)
        .then((response) => response.text())
        .then((text) => setContent(text))
        .catch((err) => console.error("Erreur de chargement", err));
    }, [path]);

    return content;
  };

  const Documentation = () => {
        const markdownContent = useMarkdown("/docs/fr/doc.md");

        return (
            <div className="documentation">
                <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}
            >
                {markdownContent}
            </ReactMarkdown>
            </div>
        );
  };

export default Documentation;
