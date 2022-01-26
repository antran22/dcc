import { Product, ProductSize } from "@/redux/apiTypes";
import React from "react";
import { useAppDispatch } from "@/redux/hooks";
import c from "classnames";
import styles from "./ProductInformation.module.scss";
import {
  currentSizeSelector,
  selectSize,
  unselectSize,
} from "@/redux/slices/productView";
import { useSelector } from "react-redux";
import Text from "#/components/Text";
import Button from "#/components/Button";

interface SizePickerProps {
  product: Product;
  className?: string;
}

const ProductSizePicker: React.FC<SizePickerProps> = ({
  product,
  className,
}) => {
  const dispatch = useAppDispatch();
  const currentlySelectedSize = useSelector(currentSizeSelector);

  const handleSelectSize = (size: ProductSize) => {
    if (size.id !== currentlySelectedSize?.id) {
      dispatch(selectSize(size));
    } else {
      dispatch(unselectSize());
    }
  };

  return (
    <div className={c(className, styles.sizePicker)}>
      <div className={c(styles.sizePickerHeader)}>
        <Text.SpecialTitle
          color="nude"
          classNames={[styles.sizePickerHeaderTitle]}
        >
          Size
        </Text.SpecialTitle>
        <Button color="dark-grey" variant="underscore">
          Hướng dẫn
        </Button>
      </div>
      <div className={styles.sizePickerList}>
        {product.sizes.map((size) => (
          <div
            key={size.id}
            onClick={() => handleSelectSize(size)}
            className={c(styles.sizePickerNode, {
              [styles.sizePickerNodeActive]:
                size.id === currentlySelectedSize?.id,
            })}
          >
            {size.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSizePicker;
