import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../../../redux/hooks';
import { cartSelector, cartSumSelector } from '../../../redux/slices/cart';
import { SidebarContext } from '../../../shared/contexts/SidebarContext';
import { CartItem } from '../../../shared/types';
import { formatCurrency } from '../../../shared/utils/number';
import Button from '../../../shared/components/Button';
import SidebarContainer from '../../../shared/components/SidebarContainer';
import Text from '../../../shared/components/Text';
import styles from './CartSidebar.module.scss';
import CartSidebarItem from '../CartSidebarItem';
import { AiOutlineArrowLeft as BackIcon } from 'react-icons/ai';
import Spacer from '../../../shared/components/Spacer';
import EmptyCartSidebar from '../EmptyCartSidebar';

const CartSidebar: React.FC = () => {
  const cartItems = useSelector(cartSelector);
  const router = useRouter();
  const { setSidebarIsOpen } = useContext(SidebarContext);
  const [currentStep, setCurrentStep] = useState(0);

  const handleCheckout = () => {
    if (currentStep === 0) {
      setCurrentStep(1);
    } else {
      router.push('/checkout');
      setSidebarIsOpen(false);
      setTimeout(() => {
        setCurrentStep(0);
      }, 600);
    }
  };

  return (
    <SidebarContainer
      title={
        <CartSidebarHeader
          onBack={() => setCurrentStep(0)}
          currentStep={currentStep}
        />
      }
    >
      {cartItems.length > 0 ? (
        <CartSidebarWithItem
          currentStep={currentStep}
          cartItems={cartItems}
          onCheckout={handleCheckout}
        />
      ) : (
        <EmptyCartSidebar />
      )}
    </SidebarContainer>
  );
};

interface CartSidebarHeaderProps {
  currentStep: number;
  onBack: () => void;
}
const CartSidebarHeader: React.FC<CartSidebarHeaderProps> = ({
  currentStep,
  onBack,
}) => {
  const BACK_SIZE = 20;
  if (currentStep === 0) {
    return <Text.P>Giỏ hàng</Text.P>;
  }

  return (
    <div className={styles['cart-sidebar-header']}>
      <Button color="white" onClick={onBack}>
        <BackIcon size={BACK_SIZE} />
      </Button>
      <Spacer />
      <Text.P>Mua thêm</Text.P>
    </div>
  );
};

interface CartSidebarWithItemProps {
  currentStep: number;
  cartItems: CartItem[];
  onCheckout: () => void;
}
const CartSidebarWithItem: React.FC<CartSidebarWithItemProps> = ({
  currentStep,
  cartItems,
  onCheckout,
}) => {
  const cartTotalSum = useAppSelector(cartSumSelector);
  return (
    <div className={styles['cart-sidebar']}>
      {currentStep === 0 ? (
        <CartContent cartItems={cartItems} />
      ) : (
        <CrossSell />
      )}

      <div className={styles['cart-sidebar-footer']}>
        <div className={styles['cart-sidebar-footer-total']}>
          <Text.P thickness="thin">Tổng:</Text.P>
          <Text.P thickness="thick" size="large">
            {formatCurrency(cartTotalSum)}
          </Text.P>
        </div>
        <Button color="red-soil" mode="fill-parent" onClick={onCheckout}>
          TIẾN HÀNH THANH TOÁN
        </Button>
      </div>
    </div>
  );
};

interface CartContentProps {
  cartItems: CartItem[];
}
const CartContent: React.FC<CartContentProps> = ({ cartItems }) => {
  return (
    <div className={styles['cart-sidebar-body']}>
      {cartItems.map((cartItem) => (
        <CartSidebarItem cartItem={cartItem} key={cartItem.id} />
      ))}
    </div>
  );
};

const CrossSell: React.FC = () => {
  return (
    <div className={styles['cross-sell']}>
      <Text.P thickness="thin" classNames={[styles['cross-sell-p']]}>
        Nếu bạn mua để tặng người ấy thì Đồ Chơi Chữ có thêm lựa chọn cho bạn:
      </Text.P>
    </div>
  );
};

export default CartSidebar;
