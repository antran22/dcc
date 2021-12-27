import React, { createContext, useState } from 'react';

export const CartSidebarContext = createContext<CartSidebarState>({
  sidebarIsOpen: false,
  setSidebarIsOpen: () => {},
});

export function CartSidebarProvider({ children }: CartSidebarProviderProps) {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  return (
    <CartSidebarContext.Provider
      value={{
        sidebarIsOpen,
        setSidebarIsOpen,
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
  sidebarIsOpen: boolean;
  setSidebarIsOpen: (sidebarIsOpen: boolean) => void;
}
