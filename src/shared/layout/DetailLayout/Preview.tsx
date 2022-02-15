import StrapiResponsiveImage from "#/components/Image/StrapiResponsiveImage";
import LoadingScreen from "#/components/LoadingScreen";
import SingleCarousel from "#/components/SingleCarousel";
import { StrapiImage } from "#/types";
import React from "react";
import styles from "./Preview.module.scss";

interface PreviewProps {
  previewImages: StrapiImage[];
}

const Preview: React.FC<PreviewProps> = ({ previewImages }) => {
  if (previewImages.length === 0) {
    return <LoadingScreen />;
  }
  return (
    <SingleCarousel time={3000} className={styles.preview}>
      {previewImages.map((image, index) => (
        <div key={index} className={styles.previewImageWrapper}>
          <StrapiResponsiveImage
            image={image}
            objectFit="contain"
            layout="fill"
          />
        </div>
      ))}
    </SingleCarousel>
  );
};

export default Preview;
