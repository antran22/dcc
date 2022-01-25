import React, {useContext, useEffect, useState} from "react";
import Tab from "#/components/Tab";
import Cart from "#/components/Cart";
import Text from "#/components/Text";
import Button from "#/components/Button";

import Image from "next/image";
import styles from "./Header.module.scss";
import c from "classnames";
import {assets} from "@/assets";
import {useRouter} from "next/router";
import {AiOutlineMenu as MenuIcon} from "react-icons/ai";
import {ViewportDimensionContext} from "#/contexts/ViewportDimensionContext";
import {MenuSidebarContext} from "#/contexts/MenuSidebarContext";

enum TabChoices {
  SAN_PHAM_LE = "Sản phẩm lẻ",
  GOI_QUA = "Gói quà",
  VE_CHUNG_TOI = "Về chúng tôi",
}

interface HeaderItem {
  label: string;
  url: string;
}

const MENU_ICON_SIZE = 30;
export const headerItems: HeaderItem[] = [
  {
    label: TabChoices.SAN_PHAM_LE,
    url: "/products",
  },
  // TODO: Enable when Packages is ready
  // {
  //   label: TabChoices.GOI_QUA,
  //   url: '/packages',
  // },
  {
    label: TabChoices.VE_CHUNG_TOI,
    url: "/about",
  },
];
const Header: React.FC = () => {
  const router = useRouter();
  const { setMenuSidebarIsOpen } = useContext(MenuSidebarContext);
  const { currentMode } = useContext(ViewportDimensionContext);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(router.pathname);
  }, [router.pathname]);

  const isOnCheckoutPage = currentPath.includes("checkout");

  return (
    <header className={c(styles.header)}>
      {!isOnCheckoutPage &&
        (currentMode !== "desktop" ? (
          <Button color="white" onClick={() => setMenuSidebarIsOpen(true)}>
            <MenuIcon size={MENU_ICON_SIZE} />
          </Button>
        ) : (
          <Tab
            color="black"
            tabItems={headerItems}
            isItemSelected={(item) => {
              return currentPath.includes(item.url);
            }}
            onTabSelect={(tabValue) => {
              router.push(tabValue.url);
            }}
          />
        ))}
      <div
        className={c([
          styles["header-logo"],
          isOnCheckoutPage ? "" : styles["header-logo-normal"],
        ])}
        role="button"
        onClick={() => {
          router.push("/");
        }}
      >
        <Image src={assets.logo} alt="DCC LOGO" />
      </div>

      {!isOnCheckoutPage ? (
        <Cart />
      ) : (
        <Text.P thickness="thin">Liên hệ: 098 395 1997</Text.P>
      )}
    </header>
  );
};

export default Header;
