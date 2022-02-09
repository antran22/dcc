import Button from "#/components/Button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addVariantToCart,
  getCartItemSelector,
  reduceVariantFromCart,
} from "@/redux/slices/cart";
import { currentProductVariantSelector } from "@/redux/slices/productView";
import React from "react";
import { AiOutlineMinus as Minus, AiOutlinePlus as Plus } from "react-icons/ai";
import styles from "./QuantityControl.module.scss";

const QuantityControl: React.FC = ({}) => {
  const dispatch = useAppDispatch();

  const currentProductVariant = useAppSelector(currentProductVariantSelector);

  const item = useAppSelector(getCartItemSelector(currentProductVariant));
  const TOGGLE_SIZE = 16;

  if (!currentProductVariant) {
    return null;
  }

  const onAddItemClick = () => {
    dispatch(addVariantToCart(currentProductVariant));
  };

  const onRemoveItemClick = () => {
    dispatch(reduceVariantFromCart(currentProductVariant));
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
        <Button classNames={[ styles.quantityControlButton ]} color="red-soil" onClick={onAddItemClick}>
          THÊM VÀO GIỎ
        </Button>
      )}
    </div>
  );
};

export default QuantityControl;
