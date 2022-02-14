import Button from "#/components/Button";
import Cart from "#/components/Cart";
import Tab from "#/components/Tab";
import Text from "#/components/Text";
import { MenuSidebarContext } from "#/contexts/MenuSidebarContext";
import { ViewportDimensionContext } from "#/contexts/ViewportDimensionContext";
import { assets } from "@/assets";
import c from "classnames";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { AiOutlineMenu as MenuIcon } from "react-icons/ai";
import styles from "./Header.module.scss";

enum TabChoices {
  SAN_PHAM_LE = "Sản phẩm lẻ",
  GOI_QUA = "Gói quà",
  VE_CHUNG_TOI = "Về chúng tôi",
}

const MENU_ICON_SIZE = 30;

export const headerItems = [
  {
    label: TabChoices.SAN_PHAM_LE,
    url: "/products",
  },
  {
    label: TabChoices.GOI_QUA,
    url: "/combos",
  },
  {
    label: TabChoices.VE_CHUNG_TOI,
    url: "/about",
  },
];

const Header: React.FC = () => {
  const router = useRouter();
  const { setMenuSidebarIsOpen } = useContext(MenuSidebarContext);
  const { currentMode } = useContext(ViewportDimensionContext);
  const isOnCheckoutPage = router.pathname.includes("checkout");

  return (
    <header className={c(styles.header)}>
      {!isOnCheckoutPage &&
        (currentMode !== "desktop" ? (
          <Button color="white" onClick={() => setMenuSidebarIsOpen(true)}>
            <MenuIcon size={MENU_ICON_SIZE} />
          </Button>
        ) : (
          <Tab tabItems={headerItems} />
        ))}
      <Link href="/" passHref>
        <a
          className={c([
            styles["header-logo"],
            isOnCheckoutPage ? "" : styles["header-logo-normal"],
          ])}
        >
          <Image src={assets.logo} alt="DCC LOGO" />
        </a>
      </Link>

      {!isOnCheckoutPage ? (
        <Cart />
      ) : (
        <Text.P thickness="thin">Liên hệ: 098 395 1997</Text.P>
      )}
    </header>
  );
};

export default Header;
