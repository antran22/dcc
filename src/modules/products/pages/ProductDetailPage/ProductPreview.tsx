import React from "react";
import styles from "./ProductPreview.module.scss";
import {StrapiImage} from "@/redux/apiTypes";
import StrapiResponsiveImage from "#/components/Image/StrapiResponsiveImage";
import SingleCarousel from "#/components/SingleCarousel";

interface ItemPreviewProps {
  images: StrapiImage[];
}

const ProductPreview: React.FC<ItemPreviewProps> = ({ images }) => {
  return (
    <SingleCarousel time={3000} className={styles.itemPreview}>
      {images.map((image, index) => (
        <div key={index} className={styles["item-preview-image-wrapper"]}>
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

export default ProductPreview;
