import Text from "#/components/Text";
import { CartItem, getProductSelectionThumbnail } from "#/types";
import { formatCurrency } from "#/utils/number";
import { getProductVariantPrice } from "@/graphql/products";
import { useAppSelector } from "@/redux/hooks";
import { cartItemsSelector, cartSumSelector } from "@/redux/slices/cart";
import React from "react";
import styles from "./CartSummary.module.scss";
import Image from "next/image";

const CartSummary: React.FC = () => {
  const cartTotalSum = useAppSelector(cartSumSelector);
  const cartItems = useAppSelector(cartItemsSelector);

  return (
    <div className={styles["cart-summary"]}>
      <div className={styles["cart-summary-box"]}>
        <div className={styles["cart-summary-box-title"]}>
          <Text.SpecialTitle color="cyan">Đơn hàng</Text.SpecialTitle>
        </div>
        <div className={styles["cart-summary-box-details"]}>
          <div className={styles["cart-summary-box-details-items"]}>
            {cartItems.map((item, index) => (
              <CartSummaryItem cartItem={item} key={index} />
            ))}
          </div>

          <div className={styles["cart-summary-box-details-footer"]}>
            <div className={styles["cart-summary-box-details-footer-total"]}>
              <Text.P thickness="thin">Thành tiền:</Text.P>
              <Text.P thickness="thin">{formatCurrency(cartTotalSum)}</Text.P>
            </div>
            <Text.P
              classNames={[
                styles["cart-summary-box-details-footer-disclaimer"],
              ]}
              thickness="thin"
            >
              Lưu ý: Phí vận chuyển sẽ được tính theo biểu phí của bên thứ 3.
              Thời gian ship ước tính 1-3 ngày.
            </Text.P>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CartSummaryItemProps {
  cartItem: CartItem;
}
const CartSummaryItem: React.FC<CartSummaryItemProps> = ({ cartItem }) => {
  const selectionImage = getProductSelectionThumbnail(cartItem.selection);
  return (
    <div className={styles["cart-summary-box-details-items-wrapper"]}>
      <div className={styles["cart-summary-box-details-items-wrapper-image"]}>
        {selectionImage && (
          <Image
            objectFit="contain"
            layout="fill"
            src={selectionImage.url}
            alt={selectionImage.alt}
          />
        )}
      </div>
      <div className={styles["cart-summary-box-details-items-wrapper-details"]}>
        <h2>{cartItemName(cartItem)}</h2>
        <Text.P thickness="thin">{`Số lượng: ${cartItem.quantity}`}</Text.P>
      </div>
      <div className={styles["cart-summary-box-details-items-wrapper-price"]}>
        <Text.P thickness="thin">
        {formatCurrency(getProductVariantPrice(cartItem.selection.variant))}
        </Text.P>
      </div>
    </div>
  );
};

export default CartSummary;

function cartItemName(cartItem: CartItem): string {
  const variant = cartItem.selection.variant;
  const productName = cartItem.selection.product.name;
  if (variant.name !== variant.id) {
    return `${productName} - ${variant.name}`;
  }
  return productName;
}
