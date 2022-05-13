import Button from "#/components/Button";
import { useQuantityAvailable } from "@/graphql/products/useQuantityAvailable";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addSelectionToCart,
  getCartItemSelector,
  reduceSelectionFromCart,
  setSelectionQuantity,
} from "@/redux/slices/cart";
import { currentProductSelectionSelector } from "@/redux/slices/productView";
import _ from "lodash";
import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { AiOutlineMinus as Minus, AiOutlinePlus as Plus } from "react-icons/ai";
import styles from "./QuantityControl.module.scss";

interface QuantityControlProps {}

const QuantityControl: React.FC<QuantityControlProps> = ({}) => {
  const dispatch = useAppDispatch();

  const productSelection = useAppSelector(currentProductSelectionSelector);
  const cartItem = useAppSelector(getCartItemSelector(productSelection));

  const { quantityAvailable, loading } = useQuantityAvailable(productSelection);

  useEffect(() => {
    if (!loading && !_.isNil(quantityAvailable) && cartItem) {
      if (cartItem.quantity > quantityAvailable) {
        dispatch(
          setSelectionQuantity({
            selection: cartItem.selection,
            newQuantity: quantityAvailable,
          })
        );
      }
    }
  }, [cartItem, dispatch, loading, quantityAvailable]);

  if (!productSelection) {
    return null;
  }

  const onAddItemClick = () => {
    if (productSelection) {
      dispatch(addSelectionToCart(productSelection));
    }
  };

  const onRemoveItemClick = () => {
    if (productSelection) {
      dispatch(reduceSelectionFromCart(productSelection));
    }
  };

  return (
    <div className={styles.quantityControl}>
      <p className={styles.quantityControlAvailable}>
        {loading ? (
          <Spinner as="span" animation="border" size="sm" />
        ) : !quantityAvailable || quantityAvailable <= 0 ? (
          <span>Hết hàng</span>
        ) : (
          <>
            <span>Còn lại: </span>
            <span style={{ width: 20 }}>{quantityAvailable}</span>
          </>
        )}
      </p>
      {cartItem && cartItem.quantity > 0 ? (
        <>
          <Button onClick={onRemoveItemClick} color="white">
            <Minus size={16} />
          </Button>
          <p className={styles.quantityControlInCart}>{cartItem.quantity}</p>
          <Button
            onClick={onAddItemClick}
            color="white"
            disabled={
              !loading &&
              !_.isNil(quantityAvailable) &&
              quantityAvailable <= cartItem.quantity
            }
          >
            <Plus size={16} />
          </Button>
        </>
      ) : (
        <Button
          classNames={[styles.quantityControlButton]}
          color="red-soil"
          onClick={onAddItemClick}
        >
          THÊM VÀO GIỎ
        </Button>
      )}
    </div>
  );
};

export default QuantityControl;
