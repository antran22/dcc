import React from "react";
import styles from "./SingleProduct.module.scss";
import Text from "#/components/Text";
import c from "classnames";
import {Product} from "@/redux/apiTypes";
import ButtonLink from "#/components/Button/ButtonLink";
import StrapiResponsiveImage from "#/components/Image/StrapiResponsiveImage";
import {formatCurrency} from "#/utils/number";

interface SingleProductProps {
  product: Product;
  containerStyle?: React.CSSProperties;
  showDetails: boolean;
  showHoverState?: boolean;
  disableHover?: boolean;
}
const SingleProduct: React.FC<SingleProductProps> = ({
  product,
  containerStyle,
  showDetails,
  disableHover,
  showHoverState = false,
}) => {
  return (
    <div
      className={c(styles["product"], {
        [styles["product-enable-hover"]]: !disableHover || showHoverState,
        [styles["product-show-hover"]]: showHoverState,
      })}
      style={{ ...containerStyle }}
    >
      <div className={styles["product-image"]}>
        {product.thumbnails.length > 0 && (
          <StrapiResponsiveImage
            objectFit="contain"
            layout="fill"
            image={product.thumbnails[0]}
          />
        )}
      </div>

      {showDetails ? (
        <>
          <div className={styles["product-info"]}>
            <h1>{product.title}</h1>
            <Text.P size="large">{formatCurrency(product.price)}</Text.P>
          </div>
          <div className={styles["product-btn-container"]}>
            <ButtonLink
              color="white"
              mode="fill-parent"
              href={`products/${product.slug}`}
            >
              CHI TIẾT SẢN PHẨM
            </ButtonLink>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default SingleProduct;
