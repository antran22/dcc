import Button from "#/components/Button";
import SidebarContainer from "#/components/SidebarContainer";
import Spacer from "#/components/Spacer";
import Text from "#/components/Text";
import { CartSidebarContext } from "#/contexts/CartSidebarContext";
import { CartItem } from "#/types";
import { formatCurrency } from "#/utils/number";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  cartItemsSelector,
  cartSumSelector,
  crossSellProductIdsSelector,
  hasCrossSoldSelector,
  visitCrossSellPage,
} from "@/redux/slices/cart";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { AiOutlineArrowLeft as BackIcon } from "react-icons/ai";
import styles from "./CartSidebar.module.scss";
import CartSidebarItem from "./CartSidebarItem";
import CrossSell from "./CrossSell";
import EmptyCartSidebar from "./EmptyCartSidebar";

const CartSidebar: React.FC = () => {
  const cartItems = useAppSelector(cartItemsSelector);
  const router = useRouter();
  const { currentStep, setCurrentStep, setOpenCartBar, openCartBar } =
    useContext(CartSidebarContext);
  const dispatch = useAppDispatch();

  const crossSellProducts = useAppSelector(crossSellProductIdsSelector);
  const hasCrossSold = useAppSelector(hasCrossSoldSelector);

  const handleCheckout = () => {
    if (currentStep === 0 && crossSellProducts.length > 0 && !hasCrossSold) {
      dispatch(visitCrossSellPage());
      setCurrentStep(1);
    } else {
      router.push("/checkout");
      setOpenCartBar(false);
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
      setSidebarIsOpen={setOpenCartBar}
      sidebarIsOpen={openCartBar}
    >
      {cartItems.length > 0 ? (
        <CartSidebarWithItem
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
    <div className={styles["cart-sidebar-header"]}>
      <Button color="white" onClick={onBack}>
        <BackIcon size={BACK_SIZE} />
      </Button>
      <Spacer />
      <Text.P>Mua thêm</Text.P>
    </div>
  );
};

interface CartSidebarWithItemProps {
  cartItems: CartItem[];
  onCheckout: () => void;
}
const CartSidebarWithItem: React.FC<CartSidebarWithItemProps> = ({
  cartItems,
  onCheckout,
}) => {
  const { currentStep } = useContext(CartSidebarContext);
  const cartTotalSum = useAppSelector(cartSumSelector);
  return (
    <div className={styles["cart-sidebar"]}>
      {currentStep === 0 ? (
        <CartContent cartItems={cartItems} />
      ) : (
        <CrossSell />
      )}

      <div className={styles["cart-sidebar-footer"]}>
        <div className={styles["cart-sidebar-footer-total"]}>
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
    <div className={styles["cart-sidebar-body"]}>
      {cartItems.map((cartItem, index) => (
        <CartSidebarItem cartItem={cartItem} key={index} />
      ))}
    </div>
  );
};

export default CartSidebar;
