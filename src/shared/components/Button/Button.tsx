import React from 'react';
import { c } from '../../utils/classNameParser';
import styles from './Button.module.scss';

interface ButtonProps {
  color: 'cyan' | 'red-soil' | 'dark-green' | 'nude' | 'black' | 'white';
  mode?: 'fill' | 'contain';
}

const Button: React.FC<ButtonProps> = ({
  mode = 'contain',
  color,
}: ButtonProps) => {
  return (
    <button
      className={c([styles.btn, styles[`btn-${mode}`], styles[`btn-${color}`]])}
    >
      Thêm vào giỏ
    </button>
  );
};

export default Button;
