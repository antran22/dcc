import React from 'react';
import { c } from '../../utils/classNameParser';
import styles from './Button.module.scss';

interface ButtonProps {
  children: string;
  color: 'cyan' | 'red-soil' | 'dark-green' | 'nude' | 'black' | 'white';
  mode?: 'fill-parent' | 'contain';
  variant?: 'fill' | 'outline';
}

const Button: React.FC<ButtonProps> = ({
  mode = 'contain',
  variant = 'fill',
  color,
  children,
}: ButtonProps) => {
  return (
    <button
      className={c([
        styles.btn,
        styles[`btn-${mode}`],
        styles[`btn-${variant}-${color}`],
      ])}
    >
      {children}
    </button>
  );
};

export default Button;
