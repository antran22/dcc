import StrapiResponsiveImage from "#/components/Image/StrapiResponsiveImage";
import Text from "#/components/Text";
import {
  CartItem,
  getSelectionPrice,
  getSelectionThumbnail,
  getSelectionTitle,
} from "#/types";
import { formatCurrency } from "#/utils/number";
import { useAppSelector } from "@/redux/hooks";
import { cartItemsSelector, cartSumSelector } from "@/redux/slices/cart";
import React from "react";
import styles from "./CartSummary.module.scss";

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
  const selectionImage = getSelectionThumbnail(cartItem.selection);
  return (
    <div className={styles["cart-summary-box-details-items-wrapper"]}>
      <div className={styles["cart-summary-box-details-items-wrapper-image"]}>
        {selectionImage && (
          <StrapiResponsiveImage
            objectFit="contain"
            layout="fill"
            image={selectionImage}
          />
        )}
      </div>
      <div className={styles["cart-summary-box-details-items-wrapper-details"]}>
        <h2>{getSelectionTitle(cartItem.selection)}</h2>
        <Text.P thickness="thin">{`Slg: ${cartItem.quantity}`}</Text.P>
      </div>
      <div className={styles["cart-summary-box-details-items-wrapper-price"]}>
        <Text.P thickness="thin">
          {formatCurrency(getSelectionPrice(cartItem.selection))}
        </Text.P>
      </div>
    </div>
  );
};

export default CartSummary;
