import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { assets } from '../../../assets';
import { CartItem } from '../../types';
import Text from '../Text';
import styles from './CartSidebarItem.module.scss';
import Button from '../Button';
import { formatCurrency } from '../../utils/number';
import { useAppDispatch } from '../../../redux/hooks';
import { deleteItem, setQuantity } from '../../../redux/slices/cart';
import { Form } from '../Form';
import { debounce } from 'lodash';

interface CartSidebarItemProps {
  cartItem: CartItem;
}
const CartSidebarItem: React.FC<CartSidebarItemProps> = ({ cartItem }) => {
  const [cartItemQuantity, setCartItemQuantity] = useState<number>(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setCartItemQuantity(cartItem.quantity);
  }, [cartItem.quantity]);

  const MIN_QUANTITY = 0;
  const MAX_QUANTITY = 30;

  const onDeleteItemClick = () => {
    dispatch(deleteItem(cartItem.id));
  };

  const debounceUpdateStore = useRef(
    debounce((quantity: number) => {
      dispatch(
        setQuantity({
          id: cartItem.id,
          quantity,
        })
      );
    }, 500)
  );

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = +event.target.value;

    let quantity = inputValue > MAX_QUANTITY ? MAX_QUANTITY : inputValue;
    quantity = quantity < MIN_QUANTITY ? MIN_QUANTITY : quantity;

    setCartItemQuantity(quantity);
    debounceUpdateStore.current(quantity);
  };

  return (
    <div className={styles['cart-sidebar-item']}>
      <div className={styles['cart-sidebar-item-image']}>
        <Image
          objectFit="contain"
          layout="fill"
          src={assets.itemBinhTinh}
          alt="Binh Tinh"
        />
      </div>

      <div className={styles['cart-sidebar-item-description']}>
        <h4>{cartItem.name}</h4>
        <Text.P classNames={[styles['cart-sidebar-item-description-price']]}>
          {formatCurrency(cartItem.price)}
        </Text.P>
        <Button variant="underscore" color="black" onClick={onDeleteItemClick}>
          Xoá
        </Button>
      </div>

      <div className={styles['cart-sidebar-item-quantity']}>
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
