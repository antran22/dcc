import React from 'react';
import styles from './IndividualItem.module.scss';
import Image from '#/components/Image';
import Text from '#/components/Text';
import { c } from '#/utils/classNameParser';
import { IProduct } from '@/redux/apiTypes';
import ButtonLink from '#/components/Button/ButtonLink';
import StrapiResponsiveImage from '#/components/Image/StrapiResponsiveImage';

interface IndividualItemProps {
  product: IProduct;
  containerStyle?: React.CSSProperties;
  showDetails: boolean;
  showHoverState?: boolean;
  disableHover?: boolean;
}
const IndividualItem: React.FC<IndividualItemProps> = ({
  product,
  containerStyle,
  showDetails,
  disableHover,
  showHoverState = false,
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
        {product.images.map((image, index) => (
          <StrapiResponsiveImage
            key={index}
            objectFit="contain"
            layout="fill"
            image={image}
          />
        ))}
      </div>
      {showDetails ? (
        <>
          <div className={styles['individual-item-info']}>
            <h1>{product.title}</h1>
            <Text.P size="large">{product.price.toString()}</Text.P>
          </div>
          <div className={styles['individual-item-btn-container']}>
            <ButtonLink
              color="white"
              mode="fill-parent"
              href={`individual-items/${product.slug}`}
            >
              CHI TIẾT SẢN PHẨM
            </ButtonLink>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default IndividualItem;
