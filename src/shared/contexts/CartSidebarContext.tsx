import React, {createContext, useState} from "react";

export const CartSidebarContext = createContext<CartSidebarState>({
  cartSidebarIsOpen: false,
  setCartSidebarIsOpen: () => {},
});

export function CartSidebarProvider({ children }: CartSidebarProviderProps) {
  const [cartSidebarIsOpen, setCartSidebarIsOpen] = useState(false);

  return (
    <CartSidebarContext.Provider
      value={{
        cartSidebarIsOpen,
        setCartSidebarIsOpen,
      }}
    >
      {children}
    </CartSidebarContext.Provider>
  );
}

interface CartSidebarProviderProps {
  children: React.ReactNode;
}

interface CartSidebarState {
  cartSidebarIsOpen: boolean;
  setCartSidebarIsOpen: (cartSidebarIsOpen: boolean) => void;
}
