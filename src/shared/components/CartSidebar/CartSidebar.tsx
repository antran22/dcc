import { useRouter } from 'next/router';
import React, { useCallback, useContext } from 'react';
import { useSelector } from 'react-redux';
import { cartSelector } from '../../../redux/slices/cart';
import { SidebarContext } from '../../contexts/SidebarContext';
import { CartItem } from '../../types';
import Button from '../Button';
import SidebarContainer from '../SidebarContainer';
import Text from '../Text';
import styles from './CartSidebar.module.scss';
import CartSidebarItem from './CartSidebarItem';

const CartSidebar: React.FC = () => {
  const cartItems = useSelector(cartSelector);

  return (
    <SidebarContainer title="Giỏ hàng">
      {cartItems.length > 0 ? (
        <CartSidebarWithItem cartItems={cartItems} />
      ) : (
        <EmptyCartSidebar />
      )}
    </SidebarContainer>
  );
};

const EmptyCartSidebar: React.FC = () => {
  const router = useRouter();
  const { setSidebarIsOpen } = useContext(SidebarContext);

  const handleCtaClick = useCallback(() => {
    router.push('/individual-items');
    setSidebarIsOpen(false);
  }, [router, setSidebarIsOpen]);

  return (
    <div>
      <Button
        variant="fill"
        color="black"
        mode="fill-parent"
        onClick={handleCtaClick}
      >
        TIẾP TỤC MUA SẮM
      </Button>
    </div>
  );
};

interface CartSidebarWithItemProps {
  cartItems: CartItem[];
}
const CartSidebarWithItem: React.FC<CartSidebarWithItemProps> = ({
  cartItems,
}) => {
  return (
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
  );
};

export default CartSidebar;
