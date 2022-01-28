import React, { createElement, Fragment, useEffect, useState } from "react";
import { unified } from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import rehype2react from "rehype-react";
import remarkGfm from "remark-gfm";

const processor = unified()
  .use(markdown)
  .use(remarkGfm)
  .use(remark2rehype, {
    allowDangerousHtml: true,
  })
  .use(rehype2react, {
    Fragment,
    createElement,
  });

export function useMarkdownProcessor(text: string) {
  const [Content, setContent] = useState<React.ReactNode>(Fragment);

  useEffect(() => {
    processor.process(text).then((file) => {
      setContent(file.result);
    });
  }, [text]);

  return Content;
}
