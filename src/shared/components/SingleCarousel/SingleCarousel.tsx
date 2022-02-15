import { useInterval } from "#/hooks";
import c from "classnames";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import styles from "./SingleCarousel.module.scss";

interface SingleCarouselProps {
  time: number;
  className?: string;
  children: React.ReactNode[];
}

const SingleCarousel: React.FC<SingleCarouselProps> = ({
  children,
  time,
  className,
}) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    setIndex(0);
  }, [children]);

  useInterval(
    () => {
      setIndex((index + 1) % children.length);
    },
    children.length < 2 ? null : time
  );

  return (
    <div className={c(className, styles.carousel)}>
      {children.map((child, i) => (
        <div
          key={i}
          className={c(
            [styles["carousel-item"]],
            index === i ? styles["shown"] : styles["hidden"]
          )}
        >
          {child}
        </div>
      ))}
      {children.length > 1 && (
        <CarouselPagination
          currentIndex={index}
          count={children.length}
          setCurrentIndex={setIndex}
        />
      )}
    </div>
  );
};

interface PaginationProps {
  setCurrentIndex: (x: number) => void;
  currentIndex: number;
  count: number;
}

const CarouselPagination: React.FC<PaginationProps> = ({
  currentIndex,
  setCurrentIndex,
  count,
}) => {
  return (
    <div className={styles.pagination}>
      {_.times(count, (index) => (
        <div
          onClick={() => setCurrentIndex(index)}
          key={index}
          className={c(
            styles.paginationDot,
            index === currentIndex ? styles.paginationDotActive : ""
          )}
        >
          ·
        </div>
      ))}
    </div>
  );
};

export default SingleCarousel;
