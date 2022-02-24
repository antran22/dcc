import Button from "#/components/Button";
import { Form } from "#/components/Form";
import StrapiResponsiveImage from "#/components/Image";
import Spacer from "#/components/Spacer";
import Text from "#/components/Text";
import {
  CartItem,
  CartSelection,
  getSelectionPrice,
  getSelectionThumbnail,
  getSelectionTitle,
} from "#/types";
import { formatCurrency } from "#/utils/number";
import { useAppDispatch } from "@/redux/hooks";
import {
  deleteSelectionFromCart,
  setSelectionQuantity,
} from "@/redux/slices/cart";
import c from "classnames";
import { debounce } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
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
    dispatch(deleteSelectionFromCart(cartItem.selection));
  };

  const debounceUpdateStore = useRef(
    debounce((quantity: number) => {
      dispatch(
        setSelectionQuantity({
          selection: cartItem.selection,
          newQuantity: quantity,
        })
      );
    }, 500)
  );

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

  const selection = cartItem.selection;
  const productVariantImage = getSelectionThumbnail(selection);

  return (
    <Row className={styles.cartSidebarItem}>
      <Col xs={3}>
        <div
          className={c([
            styles.cartSidebarItemImage,
            isDeleting ? styles.cartSidebarItemDeleting : "",
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
      </Col>
      <Col xs={9}>
        <Row>
          <Col xs={7}>
            <CartSelectionDescription
              selection={selection}
              className={isDeleting ? styles.cartSidebarItemDeleting : ""}
            />
          </Col>

          <Col xs={5}>
            <div
              className={c(
                styles.cartSidebarItemQuantity,
                isDeleting ? styles.cartSidebarItemDeleting : ""
              )}
            >
              <Form.NumberInput
                value={cartItemQuantity}
                onChange={handleQuantityChange}
                min={0}
                max={30}
              />
            </div>
          </Col>

          <Col xs={12}>
            {isDeleting ? (
              <div className={styles.cartSidebarItemDescriptionDeletePrompt}>
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
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

interface CartSelectionDescriptionProps {
  selection: CartSelection;
  className: string;
}

const CartSelectionDescription: React.FC<CartSelectionDescriptionProps> = ({
  selection,
  className,
}) => {
  const details =
    selection.type === "product_variant" ? (
      <>
        {selection.color && <Text.P>Màu: {selection.color.name}</Text.P>}
        {selection.size && <Text.P>Size: {selection.size.name}</Text.P>}
      </>
    ) : (
      <></>
    );

  return (
    <div className={c(styles.cartSidebarItemDescription, className)}>
      <h4>{getSelectionTitle(selection)}</h4>
      {details}
      <Text.P classNames={[styles.cartSidebarItemDescriptionPrice]}>
        {formatCurrency(getSelectionPrice(selection))}
      </Text.P>
    </div>
  );
};

export default CartSidebarItem;
