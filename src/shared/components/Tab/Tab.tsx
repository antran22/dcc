import React from 'react';
import { c } from '../../utils/classNameParser';
import styles from './Tab.module.scss';
import { TabItem } from './TabItem';

interface TabProps {
  color: 'black' | 'white';
  tabItems: string[];
  selectedItem: string;
}

const Tab: React.FC<TabProps> = ({
  color,
  tabItems,
  selectedItem,
}: TabProps) => {
  return (
    <div role="tablist" className={c([styles.tab, styles[`tab-${color}`]])}>
      {tabItems.map((content, i) => (
        <TabItem key={i} color={color} selected={content === selectedItem}>
          {content}
        </TabItem>
      ))}
    </div>
  );
};

export default Tab;
