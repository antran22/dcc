import React from 'react';
import { c } from '../../utils/classNameParser';
import styles from './Tab.module.scss';
import { TabItem } from './TabItem';

interface TabProps {
  color: 'black' | 'white';
  tabItems: string[];
  selectedItem: string;
  onTabSelect: (tabValue: string) => void;
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
          selected={content === selectedItem}
          onTabSelect={onTabSelect}
        >
          {content}
        </TabItem>
      ))}
    </div>
  );
};

export default Tab;
