import ButtonLink from "#/components/Button/ButtonLink";
import { MenuSidebarContext } from "#/contexts/MenuSidebarContext";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { headerItems } from "../Header/Header";
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

  const checkCurrentPathSelected = (url: string) => currentPath.includes(url);

  return (
    <SidebarContainer
      title={"Menu"}
      sidebarIsOpen={menuSidebarIsOpen}
      setSidebarIsOpen={setMenuSidebarIsOpen}
      openFrom="left"
    >
      <nav className={styles["menu-sidebar"]}>
        {headerItems.map((item) => (
          <ButtonLink
            href={item.url}
            mode="fill-parent"
            variant="outline"
            onClick={() => setMenuSidebarIsOpen(false)}
            key={item.url}
            color="black"
            classNames={[
              styles.menuSidebarListItem,
              checkCurrentPathSelected(item.url)
                ? styles["menu-sidebar-list-item-selected"]
                : "",
            ]}
          >
            {item.label}
          </ButtonLink>
        ))}
      </nav>
    </SidebarContainer>
  );
};

export default MenuSidebar;
