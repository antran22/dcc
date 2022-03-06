import Button from "#/components/Button";
import { Form } from "#/components/Form";
import { useQuantityAvailable } from "#/components/QuantityControl/useQuantityAvailable";
import Spacer from "#/components/Spacer";
import Text from "#/components/Text";
import {
  CartItem,
  getProductSelectionThumbnail,
  ProductSelection,
} from "#/types";
import { clamp, formatCurrency } from "#/utils/number";
import { getProductVariantPrice } from "@/graphql/products";
import { useAppDispatch } from "@/redux/hooks";
import {
  deleteSelectionFromCart,
  setSelectionQuantity,
} from "@/redux/slices/cart";
import c from "classnames";
import _, { debounce } from "lodash";
import Image from "next/image";
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

  const { quantityAvailable: quantityAvailable, loading } =
    useQuantityAvailable(cartItem.selection);

  useEffect(() => {
    setCartItemQuantity(cartItem.quantity);
  }, [cartItem.quantity]);

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
    const inputValue = parseInt(event.target.value);
    if (loading || _.isNil(quantityAvailable)) {
      return;
    }
    const quantity = clamp(inputValue, 0, quantityAvailable);

    if (quantity === 0) {
      setIsDeleting(true);
    } else {
      setCartItemQuantity(quantity);
      setIsDeleting(false);
      debounceUpdateStore.current(quantity);
    }
  };

  const selection = cartItem.selection;
  const selectionThumbnail = getProductSelectionThumbnail(selection);

  return (
    <Row className={c(styles.cartSidebarItem, "mb-5")}>
      <Col xs={3}>
        <div
          className={c([
            styles.cartSidebarItemImage,
            isDeleting ? styles.cartSidebarItemDeleting : "",
          ])}
        >
          {selectionThumbnail && (
            <Image
              objectFit="contain"
              layout="fill"
              src={selectionThumbnail.url}
              alt={selectionThumbnail.alt}
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
              {loading ? null : (
                <Form.NumberInput
                  value={cartItemQuantity}
                  onChange={handleQuantityChange}
                  min={0}
                  max={quantityAvailable}
                />
              )}
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
  selection: ProductSelection;
  className: string;
}

const CartSelectionDescription: React.FC<CartSelectionDescriptionProps> = ({
  selection,
  className,
}) => {
  const variant = selection.variant;
  return (
    <div className={c(styles.cartSidebarItemDescription, className)}>
      <h4>{selection.product.name}</h4>
      {variant.name !== variant.id && <p>{variant.name}</p>}
      <Text.P classNames={[styles.cartSidebarItemDescriptionPrice]}>
        {formatCurrency(getProductVariantPrice(selection.variant))}
      </Text.P>
    </div>
  );
};

export default CartSidebarItem;
