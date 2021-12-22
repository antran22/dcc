import React, { useContext } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { cartAmountSelector } from '../../../redux/slices/cart';
import { SidebarContext } from '../../contexts/SidebarContext';
import Button from '../Button';
import styles from './Cart.module.scss';

const Cart: React.FC = () => {
  const { setSidebarIsOpen } = useContext(SidebarContext);
  const cartCount = useAppSelector(cartAmountSelector);
  return (
    <Button color="white" onClick={() => setSidebarIsOpen(true)}>
      <div className={styles['cart']}>{cartCount}</div>
    </Button>
  );
};

export default Cart;
