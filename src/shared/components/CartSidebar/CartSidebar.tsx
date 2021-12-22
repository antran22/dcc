import React from 'react';
import Button from '../Button';
import SidebarContainer from '../SidebarContainer';
import styles from './CartSidebar.module.scss';

const CartSidebar: React.FC = () => {
  return (
    <SidebarContainer title="Gio Hang">
      <div className={styles['cart-sidebar']}>
        <div className={styles['cart-sidebar-body']}>sup</div>
        <div className={styles['cart-sidebar-footer']}>
          <p>Tong</p>
          <h4>100.000d</h4>
          <Button color="red-soil" mode="fill-parent" onClick={() => {}}>
            Tien Hanh Thanh Toan
          </Button>
        </div>
      </div>
    </SidebarContainer>
  );
};

export default CartSidebar;
