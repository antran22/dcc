import Button from "#/components/Button";
import Text from "#/components/Text";
import { Product } from "#/types";
import { formatCurrency } from "#/utils/number";
import { assets } from "@/assets";
import { useAppDispatch } from "@/redux/hooks";
import { addVariantToCart, reduceVariantFromCart } from "@/redux/slices/cart";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "./CrossSellItem.module.scss";

interface CrossSellItemProps {
  product: Product;
}

const CrossSellItem: React.FC<CrossSellItemProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const [isItemAdded, setIsItemAdded] = useState(false);
  const router = useRouter();

  const handleCtaClick = () => {
    if (product.colors.length > 0 || product.sizes.length > 0) {
      // Todo: show redirection modal
      return router.push(`/products/${product.slug}`);
    }
    if (isItemAdded) {
      dispatch(reduceVariantFromCart({ product }));
      setIsItemAdded(false);
    } else {
      dispatch(addVariantToCart({ product }));
      setIsItemAdded(true);
    }
  };

  return (
    <div className={styles["cross-sell-item"]}>
      <div className={styles["cross-sell-item-image"]}>
        <Image layout="responsive" src={assets.itemBinhTinh} alt="Binh Tinh" />
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
