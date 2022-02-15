import React, { createContext, useState } from "react";

export const CartSidebarContext = createContext<CartSidebarState>({
  openCartBar: false,
  setOpenCartBar: () => {},
  currentStep: 0,
  setCurrentStep: () => {},
});

export function CartSidebarProvider({ children }: CartSidebarProviderProps) {
  const [openCartBar, setOpenCartBar] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <CartSidebarContext.Provider
      value={{
        openCartBar,
        setOpenCartBar: (value) => {
          setOpenCartBar(value);
          if (!value) {
            setCurrentStep(0);
          }
        },
        currentStep,
        setCurrentStep,
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
  openCartBar: boolean;
  setOpenCartBar: (cartSidebarIsOpen: boolean) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}
