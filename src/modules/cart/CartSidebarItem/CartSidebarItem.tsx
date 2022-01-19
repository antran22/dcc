import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { assets } from '@/assets';
import { CartItem } from '#/types';
import Text from '#/components/Text';
import styles from './CartSidebarItem.module.scss';
import Button from '#/components/Button';
import { formatCurrency } from '#/utils/number';
import { useAppDispatch } from '@/redux/hooks';
import { deleteItem, setQuantity } from '@/redux/slices/cart';
import { Form } from '#/components/Form';
import { debounce } from 'lodash';
import Spacer from '#/components/Spacer';
import { c } from '#/utils/classNameParser';

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

    if (quantity === 0) {
      setIsDeleting(true);
    } else {
      setCartItemQuantity(quantity);
      setIsDeleting(false);
      debounceUpdateStore.current(quantity);
    }
  };

  return (
    <div className={styles['cart-sidebar-item']}>
      <div
        className={c([
          styles['cart-sidebar-item-image'],
          isDeleting ? styles['cart-sidebar-item-deleting'] : '',
        ])}
      >
        <Image
          objectFit="contain"
          layout="fill"
          src={assets.itemBinhTinh}
          alt="Binh Tinh"
        />
      </div>

      <div className={styles['cart-sidebar-item-description']}>
        <h4 className={isDeleting ? styles['cart-sidebar-item-deleting'] : ''}>
          {cartItem.name}
        </h4>
        <Text.P
          classNames={[
            styles['cart-sidebar-item-description-price'],
            isDeleting ? styles['cart-sidebar-item-deleting'] : '',
          ]}
        >
          {formatCurrency(cartItem.price)}
        </Text.P>
        {isDeleting ? (
          <div
            className={styles['cart-sidebar-item-description-delete-prompt']}
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
          styles['cart-sidebar-item-quantity'],
          isDeleting ? styles['cart-sidebar-item-deleting'] : '',
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
