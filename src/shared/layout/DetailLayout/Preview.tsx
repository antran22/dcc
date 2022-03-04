import LoadingScreen from "#/components/LoadingScreen";
import SingleCarousel from "#/components/SingleCarousel";
import Image from "next/image";
import React from "react";
import styles from "./Preview.module.scss";

interface PreviewProps {
  previewImages: PreviewImage[];
}

const Preview: React.FC<PreviewProps> = ({ previewImages }) => {
  if (previewImages.length === 0) {
    return <LoadingScreen />;
  }
  return (
    <SingleCarousel time={3000} className={styles.preview}>
      {previewImages.map((image, index) => (
        <div key={index} className={styles.previewImageWrapper}>
          <Image
            src={image.url}
            alt={image.alt}
            objectFit="contain"
            layout="fill"
          />
        </div>
      ))}
    </SingleCarousel>
  );
};

export default Preview;

export interface PreviewImage {
  url: string;
  alt: string;
}
