import React from "react";
import styles from "./Tab.module.scss";
import { TabItem } from "./TabItem";

export interface TabItemData {
  label: string;
  url: string;
}

interface TabProps {
  tabItems: TabItemData[];
}

export const Tab: React.FC<TabProps> = ({ tabItems }) => {
  return (
    <div role="tablist" className={styles.tab}>
      {tabItems.map((tabItem, i) => (
        <TabItem
          key={i}
          tabItem={tabItem}
          containerStyle={
            i === 0
              ? {
                  marginLeft: 0,
                }
              : {}
          }
        />
      ))}
    </div>
  );
};

export default Tab;
