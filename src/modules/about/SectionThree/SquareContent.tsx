import React from 'react';
import Text from '#/components/Text';
import { DCCColors } from '#/types';
import { c } from '#/utils/classNameParser';
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
      <Text.P
        thickness="thin"
        classNames={[
          styles['about-page-main-content-section-three-square-content-p'],
        ]}
      >
        {details}
      </Text.P>
    </div>
  );
};

export default SquareContent;
