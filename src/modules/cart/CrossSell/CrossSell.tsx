import Text from "#/components/Text";
import {Product} from "#/types";
import React from "react";
import CrossSellItem from "../CrossSellItem";
import styles from "./CrossSell.module.scss";

interface CrossSellProps {
}

const CrossSell: React.FC<CrossSellProps> = ({}) => {
  const crossSellProduct: Product[] = [];

  return (
    <div className={styles["cross-sell"]}>
      <Text.P thickness="thin" classNames={[styles["cross-sell-p"]]}>
        Nếu bạn mua để tặng người ấy thì Đồ Chơi Chữ có thêm lựa chọn cho bạn:
      </Text.P>

      <div className={styles["cross-sell-items-wrapper"]}>
        {crossSellProduct.map((product) => (
          <CrossSellItem key={product.id} product={product}/>
        ))}
      </div>
    </div>
  );
};

export default CrossSell;
