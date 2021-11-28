import React from 'react';
import { c } from '../../utils/classNameParser';
import specialTitleStyles from './SpecialTitle.module.scss';

interface SpecialTitleProps {
  color: 'cyan' | 'red-soil' | 'dark-green' | 'nude' | 'black' | 'white';
  children: string;
}
const SpecialTitle: React.FC<SpecialTitleProps> = ({
  color,
  children,
}: SpecialTitleProps) => {
  return (
    <div
      className={c([
        specialTitleStyles['special-title'],
        specialTitleStyles[`special-title-${color}`],
      ])}
    >
      {children}
    </div>
  );
};

const Text = {
  SpecialTitle,
};

export default Text;
