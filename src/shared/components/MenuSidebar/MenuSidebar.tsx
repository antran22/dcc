import {useRouter} from "next/router";
import React, {useContext, useEffect, useState} from "react";
import {MenuSidebarContext} from "#/contexts/MenuSidebarContext";
import Button from "../Button";
import {headerItems} from "../Header/Header";
import SidebarContainer from "../SidebarContainer";
import styles from "./MenuSidebar.module.scss";

const MenuSidebar: React.FC = () => {
  const router = useRouter();
  const { menuSidebarIsOpen, setMenuSidebarIsOpen } =
    useContext(MenuSidebarContext);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(router.pathname);
  }, [router.pathname]);

  const handleMenuItemClick = (url: string) => {
    router.push(url);
    setMenuSidebarIsOpen(false);
  };

  const checkCurrentPathSelected = (url: string) => currentPath.includes(url);

  return (
    <SidebarContainer
      title={"Menu"}
      sidebarIsOpen={menuSidebarIsOpen}
      setSidebarIsOpen={setMenuSidebarIsOpen}
      openFrom="left"
    >
      <nav className={styles["menu-sidebar"]}>
        <ul className={styles["menu-sidebar-list"]}>
          {headerItems.map((item) => (
            <Button
              mode="fill-parent"
              variant="outline"
              onClick={() => handleMenuItemClick(item.url)}
              key={item.url}
              color="black"
              classNames={[
                styles["menu-sidebar-list-item"],
                checkCurrentPathSelected(item.url)
                  ? styles["menu-sidebar-list-item-selected"]
                  : "",
              ]}
            >
              <li className={styles["menu-sidebar-list-item-content"]}>
                {item.label}
              </li>
            </Button>
          ))}
        </ul>
      </nav>
    </SidebarContainer>
  );
};

export default MenuSidebar;
