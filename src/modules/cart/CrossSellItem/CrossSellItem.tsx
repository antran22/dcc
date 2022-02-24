import Button from "#/components/Button";
import StrapiResponsiveImage from "#/components/Image";
import Text from "#/components/Text";
import { CartSidebarContext } from "#/contexts/CartSidebarContext";
import { getProductThumbnail, Product } from "#/types";
import { formatCurrency } from "#/utils/number";
import { useAppDispatch } from "@/redux/hooks";
import {
  addSelectionToCart,
  reduceSelectionFromCart,
} from "@/redux/slices/cart";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import styles from "./CrossSellItem.module.scss";

interface CrossSellItemProps {
  product: Product;
}

const CrossSellItem: React.FC<CrossSellItemProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const [isItemAdded, setIsItemAdded] = useState(false);
  const router = useRouter();

  const { setOpenCartBar, setCurrentStep } = useContext(CartSidebarContext);

  const handleCtaClick = () => {
    if (product.colors.length > 0 || product.sizes.length > 0) {
      // Todo: show redirection modal
      setOpenCartBar(false);
      setCurrentStep(0);
      return router.push(`/products/${product.slug}`);
    }
    if (isItemAdded) {
      dispatch(reduceSelectionFromCart({ type: "product_variant", product }));
      setIsItemAdded(false);
    } else {
      dispatch(addSelectionToCart({ type: "product_variant", product }));
      setIsItemAdded(true);
    }
  };

  const thumbnail = getProductThumbnail(product);

  return (
    <div className={styles["cross-sell-item"]}>
      <div className={styles.crossSellItemImage}>
        <StrapiResponsiveImage image={thumbnail} layout="fill" />
      </div>

      <div className={styles["cross-sell-item-description"]}>
        <h2>{product.title}</h2>
        <Text.P thickness="thin">{`+${formatCurrency(product.price)}`}</Text.P>
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
