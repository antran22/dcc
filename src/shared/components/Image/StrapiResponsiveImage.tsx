import { getLargestImageFormat, StrapiImage } from "#/types";
import { assets } from "@/assets";
import _ from "lodash";
import { ImageProps as NextImageProps } from "next/image";
import React from "react";
import Image from "./Image";

interface StrapiResponsiveImageProps
  extends Omit<NextImageProps, "src" | "alt"> {
  image?: StrapiImage;
}

const StrapiResponsiveImage: React.FC<StrapiResponsiveImageProps> = (props) => {
  const { image } = props;
  const cleanedProps = _.omit(props, "image");

  if (!image) {
    return (
      <Image src={assets.logo} alt="Placeholder image" {...cleanedProps} />
    );
  }
  const largestImageFormat = getLargestImageFormat(image);
  return (
    <Image
      src={largestImageFormat.url}
      alt={image.alternativeText}
      {...cleanedProps}
    />
  );
};

export default StrapiResponsiveImage;
