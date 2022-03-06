import { AttributeValue } from "@/graphql/products";
import editorJSHTML from "editorjs-html";
import _ from "lodash";
import React from "react";

const edJSParser = editorJSHTML();

interface RichTextRendererProps {
  input?: string;
}
export const RichTextRenderer: React.FC<RichTextRendererProps> = ({
  input,
}) => {
  if (input) {
    const edJSData = JSON.parse(input);
    const html = edJSParser.parse({ blocks: edJSData.blocks ?? [] });
    return <div dangerouslySetInnerHTML={{ __html: html.join("") }} />;
  }
  return null;
};

export const extractRichTextAttributeValue = (
  values: AttributeValue[]
): string | undefined => {
  return _.first(values)?.richText;
};
