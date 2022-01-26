import {colors} from "#/styles/colors";
import c from "classnames";
import React, {useRef} from "react";
import Slider from "react-slick";

import styles from "./Carousel.module.scss";
import SliderArrow from "./SliderArrow";

interface CarouselProps {
  children: React.ReactNode[] | React.ReactNode;
  fullHeight?: boolean;
  limitInnerHeight?: boolean;
  hideArrow?: boolean;
  autoplay?: boolean;
  slidesToShow: number;
  slidesToScroll: number;
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  fullHeight,
  limitInnerHeight,
  hideArrow,
  autoplay,
  slidesToScroll,
  slidesToShow,
}) => {
  const sliderRef = useRef<Slider>(null);

  const next = () => {
    sliderRef.current?.slickNext();
  };

  const prev = () => {
    sliderRef.current?.slickPrev();
  };

  return (
    <div
      className={c(styles.carousel, {
        "slick-full-height": fullHeight,
      })}
    >
      <Slider
        className={c(styles["carousel-slick"], {
          [styles["carousel-slick-limit-height"]]: limitInnerHeight,
        })}
        dots
        arrows={false}
        infinite
        autoplay={autoplay}
        adaptiveHeight
        slidesToShow={slidesToShow}
        slidesToScroll={slidesToScroll}
        speed={500}
        appendDots={CustomPagination}
        ref={sliderRef}
      >
        {children}
      </Slider>
      {!hideArrow && (
        <>
          <SliderArrow
            arrowType="left"
            className={styles["carousel-slider-arrow-left"]}
            onClick={prev}
          />
          <SliderArrow
            arrowType="right"
            className={styles["carousel-slider-arrow-right"]}
            onClick={next}
          />
        </>
      )}
    </div>
  );
};

const CustomPagination = (dots: React.ReactNode) => (
  <div
    style={{
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      height: 100,

      position: "fixed",
      bottom: 0,

      borderTop: `1px solid ${colors.grey}`,
    }}
  >
    <ul style={{ margin: "0px" }}> {dots} </ul>
  </div>
);

export default Carousel;
