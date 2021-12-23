import React from 'react';
import { c } from '../../utils/classNameParser';
import styles from './Spacer.module.scss';

interface SpacerProps {
  size?: 'normal' | 'small' | 'big';
}
const Spacer: React.FC<SpacerProps> = ({ size = 'normal' }) => {
  return (
    <span className={c([styles['spacer'], styles[`spacer-${size}`]])}></span>
  );
};

export default Spacer;
