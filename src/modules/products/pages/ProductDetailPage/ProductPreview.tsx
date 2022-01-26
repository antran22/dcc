import StrapiResponsiveImage from "#/components/Image/StrapiResponsiveImage";
import SingleCarousel from "#/components/SingleCarousel";
import { useAppSelector } from "@/redux/hooks";
import { previewImageSelector } from "@/redux/slices/productView";
import React from "react";
import styles from "./ProductPreview.module.scss";

const ProductPreview: React.FC = () => {
  const previewImages = useAppSelector(previewImageSelector);
  return (
    <SingleCarousel time={3000} className={styles.itemPreview}>
      {previewImages.map((image, index) => (
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
