import React from 'react';
import Image from 'next/image';
import { assets } from '../../../assets';
import { CartItem } from '../../types';
import Text from '../Text';
import styles from './CartSidebarItem.module.scss';
import Button from '../Button';
import { formatCurrency } from '../../utils/number';

interface CartSidebarItemProps {
  cartItem: CartItem;
}
const CartSidebarItem: React.FC<CartSidebarItemProps> = ({ cartItem }) => {
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
        <Button variant="underscore" color="black" onClick={() => {}}>
          Xoá
        </Button>
      </div>

      <div className={styles['cart-sidebar-item-quantity']}></div>
    </div>
  );
};

export default CartSidebarItem;
