import React from 'react';
import { DCCColors } from '../../types';
import { c } from '../../utils/classNameParser';
import specialTitleStyles from './SpecialTitle.module.scss';
import pLargeStyles from './PLarge.module.scss';

interface TextProps {
  children: string;
}
interface SpecialTitleProps extends TextProps {
  color: DCCColors;
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

interface PLargeProps extends TextProps {}
const PLarge: React.FC<PLargeProps> = ({ children }) => {
  return <p className={pLargeStyles['p-large']}>{children}</p>;
};

const Text = {
  SpecialTitle,
  PLarge,
};

export default Text;
