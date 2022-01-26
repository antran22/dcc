import {Product, ProductColor} from "#/types";
import {useAppDispatch} from "@/redux/hooks";
import {
  currentColorSelector,
  resetPreviewImages,
  selectColor,
  setPreviewImages,
  unselectColor,
} from "@/redux/slices/productView";
import c from "classnames";
import React from "react";
import {AiOutlineCheck} from "react-icons/ai";
import {useSelector} from "react-redux";
import tinycolor from "tinycolor2";
import styles from "./ProductInformation.module.scss";

interface ColorPickerProps {
  product: Product;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const currentColor = useSelector(currentColorSelector);

  const handleColorNodeClicked = (color: ProductColor) => {
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
      {product.colors.map((color) => (
        <ColorNode
          key={color.id}
          color={color}
          onClick={() => handleColorNodeClicked(color)}
          onMouseEnter={() => dispatch(setPreviewImages(color.images))}
          onMouseLeave={() => dispatch(resetPreviewImages())}
        />
      ))}
    </div>
  );
};

export default ColorPicker;

interface ColorNodeProps {
  color: ProductColor;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const ColorNode: React.FC<ColorNodeProps> = ({
  color,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const currentlySelectedColor = useSelector(currentColorSelector);

  const isColorBright = tinycolor(color.color_code).getBrightness() >= 128;
  const highlightColor = isColorBright ? "black" : "white";

  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        backgroundColor: color.color_code,
      }}
      className={c(styles.colorPickerNode, "mx-1", {
        [styles.colorPickerNodeActive]: color.id === currentlySelectedColor?.id,
      })}
    >
      <AiOutlineCheck color={highlightColor} />
    </div>
  );
};
