import React from 'react';
import { CartSidebarProvider } from '../../contexts/CartSidebarContext';
import { ViewportDimensionProvider } from '../../contexts/ViewportDimensionContext';

interface ContextWrapperProps {
  children: React.ReactNode;
}
const ContextWrapper: React.FC<ContextWrapperProps> = ({ children }) => {
  return (
    <ViewportDimensionProvider>
      <CartSidebarProvider>{children}</CartSidebarProvider>
    </ViewportDimensionProvider>
  );
};

export default ContextWrapper;
