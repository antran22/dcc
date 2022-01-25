import React from "react";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {addItem, removeItem} from "@/redux/slices/cart";
import Button from "#/components/Button";
import {CartItem} from "#/types";
import {AiOutlineMinus as Minus, AiOutlinePlus as Plus} from "react-icons/ai";
import styles from "./QuantityControl.module.scss";

interface QuantityControlProps {
  productId: string;
}
const QuantityControl: React.FC<QuantityControlProps> = ({
  productId,
}) => {
  const dispatch = useAppDispatch();
  const item = useAppSelector((state) =>
    state.cart.find((item) => item.id === productId)
  );
  const TOGGLE_SIZE = 16;

  const onAddItemClick = () => {
    if (item?.quantity === 30) return null;
    const _item: Omit<CartItem, "quantity"> = {
      id: productId,
      name: "Binh Tinh",
      price: 250000,
    };
    dispatch(addItem(_item));
  };

  const onRemoveItemClick = () => dispatch(removeItem(productId));

  return (
    <div className={styles["quantity-control"]}>
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
        <Button color="red-soil" onClick={onAddItemClick}>
          THÊM VÀO GIỎ
        </Button>
      )}
    </div>
  );
};

export default QuantityControl;
