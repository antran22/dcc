import React from 'react';
import Button from '../Button';
import SidebarContainer from '../SidebarContainer';
import styles from './CartSidebar.module.scss';
import Text from '../Text';
import { useSelector } from 'react-redux';
import { cartSelector } from '../../../redux/slices/cart';
import CartSidebarItem from './CartSidebarItem';

const CartSidebar: React.FC = () => {
  const cartItems = useSelector(cartSelector);

  return (
    <SidebarContainer title="Giỏ hàng">
      <div className={styles['cart-sidebar']}>
        <div className={styles['cart-sidebar-body']}>
          {cartItems.map((cartItem) => (
            <CartSidebarItem cartItem={cartItem} key={cartItem.id} />
          ))}
        </div>

        <div className={styles['cart-sidebar-footer']}>
          <div className={styles['cart-sidebar-footer-total']}>
            <Text.P thickness="thin">Tổng:</Text.P>
            <Text.P thickness="thick" size="large">
              100.000đ
            </Text.P>
          </div>
          <Button color="red-soil" mode="fill-parent" onClick={() => {}}>
            TIẾN HÀNH THANH TOÁN
          </Button>
        </div>
      </div>
    </SidebarContainer>
  );
};

export default CartSidebar;
