import Button from "#/components/Button";
import { Form } from "#/components/Form";
import StrapiResponsiveImage from "#/components/Image/StrapiResponsiveImage";
import Spacer from "#/components/Spacer";
import Text from "#/components/Text";
import { CartItem, getProductVariantThumbnail } from "#/types";
import { formatCurrency } from "#/utils/number";
import { useAppDispatch } from "@/redux/hooks";
import { deleteVariantFromCart, setVariantQuantity } from "@/redux/slices/cart";
import c from "classnames";
import { debounce } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import styles from "./CartSidebarItem.module.scss";

interface CartSidebarItemProps {
  cartItem: CartItem;
}
const CartSidebarItem: React.FC<CartSidebarItemProps> = ({ cartItem }) => {
  const [cartItemQuantity, setCartItemQuantity] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setCartItemQuantity(cartItem.quantity);
  }, [cartItem.quantity]);

  const MAX_QUANTITY = 30;

  const onDeleteItemClick = () => {
    dispatch(deleteVariantFromCart(cartItem.productVariant));
  };

  const debounceUpdateStore = useRef(
    debounce((quantity: number) => {
      dispatch(
        setVariantQuantity({
          productVariant: cartItem.productVariant,
          newQuantity: quantity,
        })
      );
    }, 500)
  );

  const productVariant = cartItem.productVariant;
  const product = productVariant.product;

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = +event.target.value;

    let quantity = inputValue > MAX_QUANTITY ? MAX_QUANTITY : inputValue;
    quantity = quantity < 0 ? 0 : quantity;

    if (quantity === 0) {
      setIsDeleting(true);
    } else {
      setCartItemQuantity(quantity);
      setIsDeleting(false);
      debounceUpdateStore.current(quantity);
    }
  };

  const productVariantImage = getProductVariantThumbnail(productVariant);

  return (
    <div className={styles["cart-sidebar-item"]}>
      <div
        className={c([
          styles["cart-sidebar-item-image"],
          isDeleting ? styles["cart-sidebar-item-deleting"] : "",
        ])}
      >
        {productVariantImage && (
          <StrapiResponsiveImage
            objectFit="contain"
            layout="fill"
            image={productVariantImage}
          />
        )}
      </div>

      <div className={styles["cart-sidebar-item-description"]}>
        <h4 className={isDeleting ? styles["cart-sidebar-item-deleting"] : ""}>
          {product.title}
        </h4>
        {productVariant?.color && (
          <Text.P>Màu: {productVariant.color.name}</Text.P>
        )}
        {productVariant?.size && (
          <Text.P>Size: {productVariant.size.name}</Text.P>
        )}

        <Text.P
          classNames={[
            styles["cart-sidebar-item-description-price"],
            isDeleting ? styles["cart-sidebar-item-deleting"] : "",
          ]}
        >
          {formatCurrency(product.price)}
        </Text.P>
        {isDeleting ? (
          <div
            className={styles["cart-sidebar-item-description-delete-prompt"]}
          >
            <Text.P size="small" thickness="thin">
              Xoá sản phẩm?
            </Text.P>
            <Spacer />
            <Button
              variant="underscore"
              color="black"
              onClick={onDeleteItemClick}
            >
              Đồng ý
            </Button>
            <Spacer />
            <Button
              variant="underscore"
              color="black"
              onClick={() => setIsDeleting(false)}
            >
              Huỷ
            </Button>
          </div>
        ) : (
          <Button
            variant="underscore"
            color="black"
            onClick={() => setIsDeleting(true)}
          >
            Xoá
          </Button>
        )}
      </div>

      <div
        className={c([
          styles["cart-sidebar-item-quantity"],
          isDeleting ? styles["cart-sidebar-item-deleting"] : "",
        ])}
      >
        <Form.NumberInput
          value={cartItemQuantity}
          onChange={handleQuantityChange}
          min={0}
          max={30}
        />
      </div>
    </div>
  );
};

export default CartSidebarItem;
