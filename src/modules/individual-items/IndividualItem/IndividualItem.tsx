import React, { useState } from 'react';
import styles from './IndividualItem.module.scss';
import Image from 'next/image';
import { assets } from '../../../assets';
import Button from '../../../shared/components/Button';
import { c } from '../../../shared/utils/classNameParser';
import Text from '../../../shared/components/Text';

interface IndividualItemProps {
  containerStyle?: React.CSSProperties;
  showDetails: boolean;
  showHoverState?: boolean;
  disableHover?: boolean;
  onCtaClick?: () => void;
}
const IndividualItem: React.FC<IndividualItemProps> = ({
  containerStyle,
  showDetails,
  disableHover,
  showHoverState = false,
  onCtaClick = () => {},
}) => {
  return (
    <div
      className={c([
        styles['individual-item'],
        disableHover || showHoverState
          ? ''
          : styles['individual-item-enable-hover'],
        showHoverState ? styles['individual-item-show-hover'] : '',
      ])}
      style={{ ...containerStyle }}
    >
      <div className={styles['individual-item-image']}>
        <Image
          objectFit="contain"
          layout="fill"
          src={assets.itemBinhTinh}
          alt="Binh Tinh"
        />
      </div>
      {showDetails ? (
        <>
          <div className={styles['individual-item-info']}>
            <h1>BINH TINH</h1>
            <Text.P size="large">234.000đ</Text.P>
          </div>
          <div className={styles['individual-item-btn-container']}>
            <Button color="white" mode="fill-parent" onClick={onCtaClick}>
              CHI TIẾT SẢN PHẨM
            </Button>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default IndividualItem;
