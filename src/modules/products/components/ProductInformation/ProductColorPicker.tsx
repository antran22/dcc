import { AttributeValue } from "@/graphql/products";
import { useAppDispatch } from "@/redux/hooks";
import {
  currentColorSelector,
  selectColor,
  unselectColor,
} from "@/redux/slices/productView";
import c from "classnames";
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { AiOutlineCheck } from "react-icons/ai";
import { useSelector } from "react-redux";
import tinycolor from "tinycolor2";
import styles from "./ProductInformation.module.scss";

interface ColorPickerProps {
  colors: AttributeValue[];
}

const ColorPicker: React.FC<ColorPickerProps> = ({ colors }) => {
  const dispatch = useAppDispatch();

  const currentColor = useSelector(currentColorSelector);

  const handleColorNodeClicked = (color: AttributeValue) => {
    if (currentColor?.id !== color.id) {
      dispatch(selectColor(color));
    } else {
      dispatch(unselectColor());
    }
  };

  return (
    <div
      className={c(
        styles.itemInformationBox,
        "d-flex",
        "justify-content-around",
        "py-4"
      )}
    >
      {colors.map((color) => (
        <ColorNode
          key={color.id}
          color={color}
          onClick={() => handleColorNodeClicked(color)}
        />
      ))}
    </div>
  );
};

export default ColorPicker;

interface ColorNodeProps {
  color: AttributeValue;
  onClick: () => void;
}

const ColorNode: React.FC<ColorNodeProps> = ({ color, onClick }) => {
  const currentlySelectedColor = useSelector(currentColorSelector);
  const colorCode = color.value ?? "#ffffff";
  const isColorBright = tinycolor(colorCode).getBrightness() >= 128;
  const highlightColor = isColorBright ? "black" : "white";

  return (
    <OverlayTrigger
      transition
      delay={100}
      placement="top"
      overlay={
        <Tooltip className={styles.colorPickerTooltip}>{color.name}</Tooltip>
      }
    >
      <div
        onClick={onClick}
        style={{
          backgroundColor: colorCode,
        }}
        className={c(styles.colorPickerNode, "mx-1", {
          [styles.colorPickerNodeActive]:
            color.id === currentlySelectedColor?.id,
        })}
      >
        <AiOutlineCheck color={highlightColor} />
      </div>
    </OverlayTrigger>
  );
};
