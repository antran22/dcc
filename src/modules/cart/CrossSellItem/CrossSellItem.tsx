import Button from "#/components/Button";
import Text from "#/components/Text";
import {
  getProductSelectionThumbnail,
  ProductSelectionCrossSell,
} from "#/types";
import { formatCurrency } from "#/utils/misc";
import {
  CrossSellProductVariant,
  getProductVariantPrice,
  productSelectionName,
} from "@/graphql/products";
import { CrossSellProduct } from "@/graphql/products/useCrossSellProducts";
import { useAppDispatch } from "@/redux/hooks";
import {
  addSelectionToCart,
  reduceSelectionFromCart,
} from "@/redux/slices/cart";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./CrossSellItem.module.scss";

interface CrossSellItemProps {
  product: CrossSellProduct;
}

function getFirstAvailableVariant(
  product: CrossSellProduct
): CrossSellProductVariant | undefined {
  if (!product.variants) {
    return undefined;
  }

  for (const variant of product.variants) {
    if (variant?.quantityAvailable && variant.quantityAvailable > 0) {
      return variant;
    }
  }
}

const CrossSellItem: React.FC<CrossSellItemProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const [isItemAdded, setIsItemAdded] = useState(false);

  const firstAvailableVariant = getFirstAvailableVariant(product);
  if (!firstAvailableVariant) {
    return null;
  }
  const selection: ProductSelectionCrossSell = {
    product,
    variant: firstAvailableVariant,
    type: "cross_sell",
  };
  const handleCtaClick = () => {
    if (isItemAdded) {
      dispatch(reduceSelectionFromCart(selection));
      setIsItemAdded(false);
    } else {
      dispatch(addSelectionToCart(selection));
      setIsItemAdded(true);
    }
  };

  const thumbnail = getProductSelectionThumbnail(selection);

  return (
    <div className={styles.crossSellItem}>
      <div className={styles.crossSellItemImage}>
        {thumbnail && (
          <Image src={thumbnail.url} alt={thumbnail.alt} layout="fill" />
        )}
      </div>

      <h2 className={styles.crossSellItemTitle}>
        {productSelectionName(selection)}
      </h2>

      <div className={styles.crossSellItemDescription}>
        <Text.P thickness="thin">{`+ ${formatCurrency(
          getProductVariantPrice(firstAvailableVariant)
        )}`}</Text.P>
      </div>

      <div className={styles["cross-sell-item-button"]}>
        <Button
          onClick={handleCtaClick}
          mode="fill-parent"
          color={isItemAdded ? "cyan" : "black"}
        >
          {isItemAdded ? "ĐÃ THÊM" : "THÊM"}
        </Button>
      </div>
    </div>
  );
};

export default CrossSellItem;
