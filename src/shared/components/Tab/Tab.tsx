import React from 'react';
import { c } from '../../utils/classNameParser';
import styles from './Tab.module.scss';
import { TabItem } from './TabItem';

export interface TabItemData {
  label: string;
}
interface TabProps {
  color: 'black' | 'white';
  tabItems: TabItemData[];
  selectedItem: TabItemData | null;
  onTabSelect: (tabValue: TabItemData) => void;
}

const Tab: React.FC<TabProps> = ({
  color,
  tabItems,
  selectedItem,
  onTabSelect,
}: TabProps) => {
  return (
    <div role="tablist" className={c([styles.tab, styles[`tab-${color}`]])}>
      {tabItems.map((content, i) => (
        <TabItem
          key={i}
          color={color}
          selected={content.label === selectedItem?.label}
          onTabSelect={onTabSelect}
          tabItem={content}
        ></TabItem>
      ))}
    </div>
  );
};

export default Tab;
