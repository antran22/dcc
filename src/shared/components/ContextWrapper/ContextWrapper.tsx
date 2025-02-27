import {CartSidebarProvider} from "#/contexts/CartSidebarContext";
import {MenuSidebarProvider} from "#/contexts/MenuSidebarContext";
import {ViewportDimensionProvider} from "#/contexts/ViewportDimensionContext";
import React from "react";

interface ContextWrapperProps {
  children: React.ReactNode;
}
const ContextWrapper: React.FC<ContextWrapperProps> = ({ children }) => {
  return (
    <ViewportDimensionProvider>
      <MenuSidebarProvider>
        <CartSidebarProvider>{children}</CartSidebarProvider>
      </MenuSidebarProvider>
    </ViewportDimensionProvider>
  );
};

export default ContextWrapper;
