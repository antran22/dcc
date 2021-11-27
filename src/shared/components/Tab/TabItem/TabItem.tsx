import React from 'react';
import { c } from '../../../utils/classNameParser';
import styles from './TabItem.module.scss';

interface TabItemProps {
  children: string;
  color: 'black' | 'white';
  selected: boolean;
  onTabSelect: (tabValue: string) => void;
}

export const TabItem: React.FC<TabItemProps> = ({
  children,
  color,
  selected,
  onTabSelect,
}: TabItemProps) => {
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
      onClick={() => onTabSelect(children)}
    >
      {children}
    </div>
  );
};
