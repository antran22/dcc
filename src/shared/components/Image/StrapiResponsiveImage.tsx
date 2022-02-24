import { getLargestImageUrl, StrapiImage } from "#/types";
import { assets } from "@/assets";
import _ from "lodash";
import Image, { ImageProps } from "next/image";
import React from "react";

interface StrapiResponsiveImageProps extends Omit<ImageProps, "src" | "alt"> {
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
  const url = getLargestImageUrl(image);

  return (
    <Image
      src={url}
      alt={image.alternativeText}
      {...cleanedProps}
    />
  );
};

export default StrapiResponsiveImage;
