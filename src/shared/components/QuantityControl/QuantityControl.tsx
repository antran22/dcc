import Button from "#/components/Button";
import { CartSelection } from "#/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addSelectionToCart,
  getCartItemSelector,
  reduceSelectionFromCart,
} from "@/redux/slices/cart";
import React from "react";
import { AiOutlineMinus as Minus, AiOutlinePlus as Plus } from "react-icons/ai";
import styles from "./QuantityControl.module.scss";

interface QuantityControlProps {
  cartSelection?: CartSelection;
}

const QuantityControl: React.FC<QuantityControlProps> = ({ cartSelection }) => {
  const dispatch = useAppDispatch();

  const item = useAppSelector(getCartItemSelector(cartSelection));
  const TOGGLE_SIZE = 16;

  if (!cartSelection) {
    return null;
  }

  const onAddItemClick = () => {
    dispatch(addSelectionToCart(cartSelection));
  };

  const onRemoveItemClick = () => {
    dispatch(reduceSelectionFromCart(cartSelection));
  };

  return (
    <div className={styles.quantityControl}>
      {item && item.quantity > 0 ? (
        <>
          <Button onClick={onRemoveItemClick} color="white">
            <Minus size={TOGGLE_SIZE} />
          </Button>
          <p>{item.quantity}</p>
          <Button onClick={onAddItemClick} color="white">
            <Plus size={TOGGLE_SIZE} />
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
