import React, {createContext, useState} from "react";

export const MenuSidebarContext = createContext<MenuSidebarState>({
  menuSidebarIsOpen: false,
  setMenuSidebarIsOpen: () => {},
});

export function MenuSidebarProvider({ children }: MenuSidebarProviderProps) {
  const [menuSidebarIsOpen, setMenuSidebarIsOpen] = useState(false);

  return (
    <MenuSidebarContext.Provider
      value={{
        menuSidebarIsOpen,
        setMenuSidebarIsOpen,
      }}
    >
      {children}
    </MenuSidebarContext.Provider>
  );
}

interface MenuSidebarProviderProps {
  children: React.ReactNode;
}

interface MenuSidebarState {
  menuSidebarIsOpen: boolean;
  setMenuSidebarIsOpen: (menuSidebarIsOpen: boolean) => void;
}
