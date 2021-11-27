import React from 'react';
import { c } from '../../utils/classNameParser';
import specialTitleStyles from './SpecialTitle.module.scss';

interface SpecialTitleProps {
  color: 'cyan' | 'red-soil' | 'dark-green' | 'nude' | 'black' | 'white';
}
const SpecialTitle: React.FC<SpecialTitleProps> = ({
  color,
}: SpecialTitleProps) => {
  return (
    <div
      className={c([
        specialTitleStyles['special-title'],
        specialTitleStyles[`special-title-${color}`],
      ])}
    >
      Special Title
    </div>
  );
};

const Text = {
  SpecialTitle,
};

export default Text;
