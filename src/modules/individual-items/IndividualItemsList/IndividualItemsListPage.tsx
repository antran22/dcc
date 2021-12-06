import { NextPage } from 'next';
import React, { useContext } from 'react';
import Slider from 'react-slick';
import { ViewportDimensionContext } from '../../../shared/contexts/viewportDimensionContext';
import { HEADER_HEIGHT } from '../../../shared/styles/constants';
import styles from './IndividualItemsListPage.module.scss';

const IndividualItemsList: NextPage = () => {
  const { height } = useContext(ViewportDimensionContext);
  const PADDING_BOTTOM = 40;
  const itemHeight = height - HEADER_HEIGHT - PADDING_BOTTOM;

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    adaptiveHeight: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  return (
    <div className={styles['individual-items-list-page']}>
      <Slider {...settings}>
        <div>
          <div style={{ height: itemHeight, backgroundColor: 'blue' }}>SUP</div>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
    </div>
  );
};

export default IndividualItemsList;
