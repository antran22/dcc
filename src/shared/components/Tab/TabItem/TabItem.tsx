import React from 'react';
import { c } from '../../../utils/classNameParser';
import { TabItemData } from '../Tab';
import styles from './TabItem.module.scss';

interface TabItemProps<T extends TabItemData> {
  tabItem: T;
  color: 'black' | 'white';
  selected: boolean;
  onTabSelect: (tabValue: T) => void;
}

export function TabItem<T extends TabItemData>({
  tabItem,
  color,
  selected,
  onTabSelect,
}: TabItemProps<T>) {
  const selectedClass = selected ? `tab-item-${color}-selected` : '';
  return (
    <div
      role="tab"
      tabIndex={0}
      className={c([
        styles['tab-item'],
        styles[`tab-item-${color}`],
        styles[selectedClass],
      ])}
      onClick={() => onTabSelect(tabItem)}
    >
      {tabItem.label}
    </div>
  );
}
