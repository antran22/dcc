import {getUrlFromAPIPath} from "#/utils/resolveAPIPath";
import _ from "lodash";
import NextImage, {ImageProps as NextImageProps} from "next/image";
import React from "react";

interface ImageProps extends NextImageProps {}

const Image: React.FC<ImageProps> = (props) => {
  let src = props.src;

  if (_.isString(props.src)) {
    src = getUrlFromAPIPath(props.src);
  }

  return <NextImage {...props} src={src} />;
};

export default Image;
