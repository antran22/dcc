import Text from "#/components/Text";
import { CartItem, getProductSelectionThumbnail } from "#/types";
import { formatCurrency } from "#/utils/misc";
import {
  getProductAttributeMap,
  getProductVariantPrice,
  productSelectionName,
} from "@/graphql/products";
import { CartSummaryItemGifts } from "@/modules/checkout/CartSummary/CartSummaryItemGifts";
import { useAppSelector } from "@/redux/hooks";
import { cartItemsSelector, cartSumSelector } from "@/redux/slices/cart";
import Image from "next/image";
import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
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
        <div className="p-3">
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
  const attributes = getProductAttributeMap(cartItem.selection.product);

  const gifts = attributes["gift"];

  return (
    <div className="container">
      <Row className="mb-2 align-items-center">
        <Col xs={2} className="position-relative" style={{ height: 100 }}>
          {selectionImage && (
            <Image
              objectFit="contain"
              layout="fill"
              src={selectionImage.url}
              alt={selectionImage.alt}
            />
          )}
        </Col>
        <Col xs={6}>
          <h2>{productSelectionName(cartItem.selection)}</h2>
          <Text.P thickness="thin">{`Số lượng: ${cartItem.quantity}`}</Text.P>
        </Col>
        <Col xs={4}>
          <Text.P thickness="thin" style={{ textAlign: "right" }}>
            {formatCurrency(getProductVariantPrice(cartItem.selection.variant))}
          </Text.P>
        </Col>
      </Row>
      <div className="ps-5">
        <CartSummaryItemGifts gifts={gifts} />
      </div>
    </div>
  );
};

export default CartSummary;
