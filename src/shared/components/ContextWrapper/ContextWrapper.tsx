import React from 'react';
import { SidebarProvider } from '../../contexts/SidebarContext';
import { ViewportDimensionProvider } from '../../contexts/ViewportDimensionContext';

interface ContextWrapperProps {
  children: React.ReactNode;
}
const ContextWrapper: React.FC<ContextWrapperProps> = ({ children }) => {
  return (
    <ViewportDimensionProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </ViewportDimensionProvider>
  );
};

export default ContextWrapper;
