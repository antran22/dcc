import React from 'react';
import { c } from '../../utils/classNameParser';
import styles from './Tab.module.scss';
import { TabItem } from './TabItem';

export interface TabItemData {
  label: string;
}
interface TabProps<T extends TabItemData> {
  color: 'black' | 'white';
  tabItems: Array<T>;
  isItemSelected: (tabItem: T) => boolean;
  onTabSelect: (tabValue: T) => void;
}

function Tab<T extends TabItemData>({
  color,
  tabItems,
  isItemSelected,
  onTabSelect,
}: TabProps<T>) {
  return (
    <div role="tablist" className={c([styles.tab, styles[`tab-${color}`]])}>
      {tabItems.map((content, i) => (
        <TabItem
          key={i}
          color={color}
          selected={isItemSelected(content)}
          onTabSelect={onTabSelect}
          tabItem={content}
        ></TabItem>
      ))}
    </div>
  );
}

export default Tab;
