import React from 'react';
import Text from '../../../shared/components/Text';
import { DCCColors } from '../../../shared/types';
import { c } from '../../../shared/utils/classNameParser';
import styles from './SectionThree.module.scss';

export interface SquareContentData {
  title: string;
  titleColor: DCCColors;
  details: string;
}

const SquareContent: React.FC<SquareContentData> = ({
  title,
  titleColor,
  details,
}) => {
  return (
    <div
      className={c([
        styles['about-page-main-content-section-three-square-content'],
      ])}
    >
      <Text.SpecialTitle
        classNames={[
          styles['about-page-main-content-section-three-square-content-title'],
        ]}
        color={titleColor}
      >
        {title}
      </Text.SpecialTitle>
      <p style={{ margin: 0 }}>{details}</p>
    </div>
  );
};

export default SquareContent;
