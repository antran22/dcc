import ButtonLink from "#/components/Button/ButtonLink";
import StrapiResponsiveImage from "#/components/Image/StrapiResponsiveImage";
import Text from "#/components/Text";
import {ViewportDimensionContext} from "#/contexts/ViewportDimensionContext";
import {colors} from "#/styles/colors";
import {HEADER_HEIGHT} from "#/styles/constants";
import {Product} from "#/types";
import {formatCurrency} from "#/utils/number";
import React, {useContext} from "react";
import styles from "./SingleProduct.module.scss";

interface SingleProductProps {
  product: Product;
}
const SingleProduct: React.FC<SingleProductProps> = ({ product }) => {
  const { height } = useContext(ViewportDimensionContext);
  const PAGINATION_HEIGHT = 100;
  const itemHeight = height - HEADER_HEIGHT - PAGINATION_HEIGHT;
  return (
    <div className={styles.product} style={{ height: itemHeight }}>
      <div
        className={styles.productBackground}
        style={{
          backgroundColor: product.theme_color_code ?? colors.darkGrey,
        }}
      />
      <div className={styles["product-image"]}>
        {product.thumbnails.length > 0 && (
          <StrapiResponsiveImage
            objectFit="contain"
            layout="fill"
            image={product.thumbnails[0]}
          />
        )}
      </div>

      <div className={styles.productInfo}>
        <h1 className={styles.productTitle}>{product.title}</h1>
        <Text.P size="large">{formatCurrency(product.price)}</Text.P>
      </div>
      <div className={styles.productBtnContainer}>
        <ButtonLink
          color="white"
          mode="fill-parent"
          href={`products/${product.slug}`}
        >
          CHI TIẾT SẢN PHẨM
        </ButtonLink>
      </div>
    </div>
  );
};

export default SingleProduct;
