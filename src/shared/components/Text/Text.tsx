import React from 'react';
import { DCCColors } from '../../types';
import { c } from '../../utils/classNameParser';
import specialTitleStyles from './SpecialTitle.module.scss';

interface SpecialTitleProps {
  color: DCCColors;
  children: string;
  classNames?: string[];
}
const SpecialTitle: React.FC<SpecialTitleProps> = ({
  color,
  children,
  classNames = [],
}: SpecialTitleProps) => {
  return (
    <div
      className={c([
        specialTitleStyles['special-title'],
        specialTitleStyles[`special-title-${color}`],
        ...classNames,
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
