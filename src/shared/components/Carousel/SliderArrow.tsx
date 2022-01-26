import c from "classnames";
import React from "react";
import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";
import styles from "./SliderArrow.module.scss";

type SliderArrowType = "left" | "right";
interface SliderArrowProps {
  arrowType: SliderArrowType;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => any;
}

type SliderArrowObj = Record<SliderArrowType, React.ReactNode>;

const SliderArrow: React.FC<SliderArrowProps> = (props) => {
  const Arrow: SliderArrowObj = {
    left: <AiOutlineArrowLeft className={styles["slider-arrow-icon"]} />,
    right: <AiOutlineArrowRight className={styles["slider-arrow-icon"]} />,
  };

  return (
    <div
      className={c(props.className, styles["slider-arrow"])}
      onClick={props.onClick}
      style={props.style}
      role="button"
    >
      {Arrow[props.arrowType]}
    </div>
  );
};

export default SliderArrow;
