import Text from "#/components/Text";
import { useAppSelector } from "@/redux/hooks";
import { crossSellProductSelector } from "@/redux/slices/cart";
import React from "react";
import CrossSellItem from "../CrossSellItem";
import styles from "./CrossSell.module.scss";

interface CrossSellProps {}

const CrossSell: React.FC<CrossSellProps> = ({}) => {
  const crossSellProducts = useAppSelector(crossSellProductSelector);

  return (
    <div className={styles.crossSell}>
      <Text.P thickness="thin" classNames={[styles.crossSellP]}>
        Nếu bạn mua để tặng người ấy thì Đồ Chơi Chữ có thêm lựa chọn cho bạn:
      </Text.P>

      <div className={styles.crossSellItemsWrapper}>
        {crossSellProducts.map((product) => (
          <CrossSellItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CrossSell;
