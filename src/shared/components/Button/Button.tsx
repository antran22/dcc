import React from 'react';
import { DCCColors } from '../../types';
import { c } from '../../utils/classNameParser';
import styles from './Button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  color: DCCColors;
  mode?: 'fill-parent' | 'contain';
  variant?: 'fill' | 'outline';
  classNames?: string[];
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  mode = 'contain',
  variant = 'fill',
  color,
  children,
  onClick,
  classNames = [],
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={c([
        styles.btn,
        styles[`btn-${mode}`],
        styles[`btn-${variant}-${color}`],
        ...classNames,
      ])}
    >
      {children}
    </button>
  );
};

export default Button;
