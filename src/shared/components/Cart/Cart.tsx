import { CartSidebarContext } from "#/contexts/CartSidebarContext";
import { useAppSelector } from "@/redux/hooks";
import { cartAmountSelector } from "@/redux/slices/cart";
import React, { useContext } from "react";
import Button from "../Button";
import styles from "./Cart.module.scss";

const Cart: React.FC = () => {
  const { setOpenCartBar } = useContext(CartSidebarContext);
  const cartCount = useAppSelector(cartAmountSelector);
  return (
    <Button
      color="white"
      onClick={() => setOpenCartBar(true)}
      classNames={[styles.cartButton]}
    >
      {cartCount}
    </Button>
  );
};

export default Cart;
