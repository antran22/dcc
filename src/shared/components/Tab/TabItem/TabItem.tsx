import c from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { TabItemData } from "../Tab";
import styles from "./TabItem.module.scss";

interface TabItemProps {
  tabItem: TabItemData;
  containerStyle?: React.CSSProperties;
}

export const TabItem: React.FC<TabItemProps> = ({
  tabItem,
  containerStyle,
}) => {
  const router = useRouter();
  const selected = router.pathname.includes(tabItem.url);
  return (
    <Link as={tabItem.url} href={tabItem.url} passHref>
      <a
        role="tab"
        tabIndex={0}
        className={c(styles.tabItem, selected ? styles.tabItemSelected : "")}
        style={{ ...containerStyle }}
      >
        {tabItem.label}
      </a>
    </Link>
  );
};
