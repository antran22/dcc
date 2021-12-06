import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useContext, useRef } from 'react';
import Slider from 'react-slick';
import { ViewportDimensionContext } from '../../../shared/contexts/viewportDimensionContext';
import { colors } from '../../../shared/styles/colors';
import { HEADER_HEIGHT } from '../../../shared/styles/constants';
import IndividualItem from '../IndividualItem';
import SliderArrow from '../SliderArrow';
import styles from './IndividualItemsListPage.module.scss';

const IndividualItemsListPage: NextPage = () => {
  const { height } = useContext(ViewportDimensionContext);
  const router = useRouter();
  const sliderRef = useRef<Slider>(null);
  const PAGINATION_HEIGHT = 100;
  const itemHeight = height - HEADER_HEIGHT - PAGINATION_HEIGHT;

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    adaptiveHeight: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    appendDots: CustomPagination,
  };

  const next = () => {
    sliderRef.current?.slickNext();
  };

  const prev = () => {
    sliderRef.current?.slickPrev();
  };

  const onCtaClick = (itemId: number) => {
    router.push(`/individual-items/${itemId}`);
  };

  return (
    <div className={styles['individual-items-list-page']}>
      <Slider {...settings} ref={sliderRef}>
        <div>
          <IndividualItem
            showDetails
            containerStyle={{ height: itemHeight }}
            onCtaClick={() => onCtaClick(10)}
          />
        </div>
        <div>
          <IndividualItem
            showDetails
            containerStyle={{ height: itemHeight }}
            onCtaClick={() => onCtaClick(10)}
          />
        </div>
        <div>
          <IndividualItem
            showDetails
            containerStyle={{ height: itemHeight }}
            onCtaClick={() => onCtaClick(10)}
          />
        </div>
        <div>
          <IndividualItem
            showDetails
            containerStyle={{ height: itemHeight }}
            onCtaClick={() => onCtaClick(10)}
          />
        </div>
      </Slider>

      <SliderArrow
        arrowType="left"
        className={styles['individual-items-list-page-slider-arrow-left']}
        onClick={prev}
      />
      <SliderArrow
        arrowType="right"
        className={styles['individual-items-list-page-slider-arrow-right']}
        onClick={next}
      />
    </div>
  );
};

const CustomPagination = (dots: React.ReactNode) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      height: 100,

      position: 'fixed',
      bottom: 0,

      borderTop: `1px solid ${colors.grey}`,
    }}
  >
    <ul style={{ margin: '0px' }}> {dots} </ul>
  </div>
);

export default IndividualItemsListPage;
