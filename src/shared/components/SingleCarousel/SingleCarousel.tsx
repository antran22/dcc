import React, {useEffect, useState} from "react";
import styles from "./SingleCarousel.module.scss";
import {useInterval} from "#/hooks";
import c from "classnames";

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
    </div>
  );
};

export default SingleCarousel;
