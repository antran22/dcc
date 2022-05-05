import Button from "#/components/Button";
import SidebarContainer from "#/components/SidebarContainer";
import Spacer from "#/components/Spacer";
import Text from "#/components/Text";
import { CartSidebarContext } from "#/contexts/CartSidebarContext";
import { CartItem } from "#/types";
import { formatCurrency } from "#/utils/misc";
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
      router.push("/checkout").then(() => {
        setOpenCartBar(false);
        setCurrentStep(0);
      });
    }
  };

  return (
    <SidebarContainer
      title={<CartSidebarHeader />}
      footer={<CartSidebarFooter handleCheckout={handleCheckout} />}
      setSidebarIsOpen={setOpenCartBar}
      sidebarIsOpen={openCartBar}
    >
      {cartItems.length > 0 ? (
        <CartSidebarContent
          cartItems={cartItems}
          handleCheckout={handleCheckout}
        />
      ) : (
        <EmptyCartSidebar />
      )}
    </SidebarContainer>
  );
};

export default CartSidebar;

const CartSidebarHeader: React.FC = () => {
  const { currentStep, setCurrentStep } = useContext(CartSidebarContext);
  if (currentStep === 0) {
    return <Text.P>Giỏ hàng</Text.P>;
  }

  return (
    <div className={styles.cartSidebarHeader}>
      <Button
        color="white"
        onClick={() => setCurrentStep(0)}
        classNames={[styles.cartSidebarButton]}
      >
        <BackIcon size={20} />
      </Button>
      <Spacer />
      <Text.P>Mua thêm</Text.P>
    </div>
  );
};

interface CartSidebarContentProps {
  cartItems: CartItem[];
  handleCheckout: () => void;
}

const CartSidebarContent: React.FC<CartSidebarContentProps> = ({
  cartItems,
  handleCheckout,
}) => {
  const { currentStep } = useContext(CartSidebarContext);
  return (
    <div className={styles.cartSidebar}>
      {currentStep === 0 ? (
        <div className={styles["cart-sidebar-body"]}>
          {cartItems.map((cartItem, index) => (
            <CartSidebarItem cartItem={cartItem} key={index} />
          ))}
        </div>
      ) : (
        <CrossSell handleCheckout={handleCheckout} />
      )}
    </div>
  );
};

interface CartSidebarFooterProps {
  handleCheckout: () => void;
}

const CartSidebarFooter: React.FC<CartSidebarFooterProps> = ({
  handleCheckout,
}) => {
  const cartTotalSum = useAppSelector(cartSumSelector);

  return (
    <div className={styles.cartSidebarFooter}>
      <div className={styles.cartSidebarFooterTotal}>
        <Text.P thickness="thin">Tổng:</Text.P>
        <Text.P thickness="thick" size="large">
          {formatCurrency(cartTotalSum)}
        </Text.P>
      </div>
      <Button color="red-soil" mode="fill-parent" onClick={handleCheckout}>
        TIẾN HÀNH THANH TOÁN
      </Button>
    </div>
  );
};
