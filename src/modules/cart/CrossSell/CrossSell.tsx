import Text from "#/components/Text";
import { useAppSelector } from "@/redux/hooks";
import { crossSellProductIdsSelector } from "@/redux/slices/cart";
import React from "react";
import styles from "./CrossSell.module.scss";

interface CrossSellProps {}

const CrossSell: React.FC<CrossSellProps> = ({}) => {
  const crossSellIds = useAppSelector(crossSellProductIdsSelector);

  return (
    <div className={styles.crossSell}>
      <Text.P thickness="thin" classNames={[styles.crossSellP]}>
        Nếu bạn mua để tặng người ấy thì Đồ Chơi Chữ có thêm lựa chọn cho bạn:
      </Text.P>
    </div>
  );
};

export default CrossSell;
