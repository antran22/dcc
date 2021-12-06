import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { addItem, removeItem } from '../../../redux/slices/cart';
import Button from '../../../shared/components/Button';
import { CartItem } from '../../../shared/types';
import { AiOutlinePlus as Plus, AiOutlineMinus as Minus } from 'react-icons/ai';
import styles from './ItemQuantityControl.module.scss';

interface ItemQuantityControlProps {
  itemId: string;
}
const ItemQuantityControl: React.FC<ItemQuantityControlProps> = ({
  itemId,
}) => {
  const dispatch = useAppDispatch();
  const item = useAppSelector((state) =>
    state.cart.find((item) => item.id === itemId)
  );
  const TOGGLE_SIZE = 16;

  const onAddItemClick = () => {
    const item: Omit<CartItem, 'quantity'> = {
      id: itemId,
      name: 'Binh Tinh',
      price: 250000,
    };
    dispatch(addItem(item));
  };

  const onRemoveItemClick = () => dispatch(removeItem(itemId));

  return (
    <div className={styles['quantity-control']}>
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

export default ItemQuantityControl;
