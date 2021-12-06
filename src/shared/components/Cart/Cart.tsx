import React from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { cartAmountSelector } from '../../../redux/slices/cart';
import styles from './Cart.module.scss';

const Cart: React.FC = () => {
  const cartCount = useAppSelector(cartAmountSelector);
  return <div className={styles['cart']}>{cartCount}</div>;
};

export default Cart;
