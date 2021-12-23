import React from 'react';
import { DCCColors } from '../../types';
import { c } from '../../utils/classNameParser';
import specialTitleStyles from './SpecialTitle.module.scss';
import pStyles from './P.module.scss';

interface TextProps {
  children: string;
  classNames?: string[];
}
interface SpecialTitleProps extends TextProps {
  color: DCCColors;
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

interface PProps extends TextProps {
  size?: 'large' | 'normal' | 'small';
  thickness?: 'thick' | 'normal' | 'thin';
}
const P: React.FC<PProps> = ({
  children,
  size = 'normal',
  thickness = 'normal',
  classNames = [],
}) => {
  return (
    <p
      className={c([
        pStyles[`p-thickness-${thickness}`],
        pStyles[`p-size-${size}`],
        ...classNames,
      ])}
    >
      {children}
    </p>
  );
};

const Text = {
  SpecialTitle,
  P,
};

export default Text;
