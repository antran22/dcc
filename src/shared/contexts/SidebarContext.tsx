import React, { createContext, useCallback, useEffect, useState } from 'react';
import { BREAKPOINT_MOBILE, BREAKPOINT_TABLET } from '../styles/constants';

export const SidebarContext = createContext<SidebarState>({
  sidebarIsOpen: false,
  setSidebarIsOpen: () => {},
});

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  return (
    <SidebarContext.Provider
      value={{
        sidebarIsOpen,
        setSidebarIsOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

interface SidebarProviderProps {
  children: React.ReactNode;
}

interface SidebarState {
  sidebarIsOpen: boolean;
  setSidebarIsOpen: (sidebarIsOpen: boolean) => void;
}

export type ViewportModes = 'desktop' | 'tablet' | 'mobile';
