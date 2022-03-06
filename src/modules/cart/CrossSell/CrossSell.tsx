import Text from "#/components/Text";
import { useCrossSellProducts } from "@/graphql/products/useCrossSellProducts";
import CrossSellItem from "@/modules/cart/CrossSellItem";
import { useAppSelector } from "@/redux/hooks";
import { crossSellProductIdsSelector } from "@/redux/slices/cart";
import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import styles from "./CrossSell.module.scss";

interface CrossSellProps {
  handleCheckout: () => void;
}

const CrossSell: React.FC<CrossSellProps> = ({ handleCheckout }) => {
  const crossSellIds = useAppSelector(crossSellProductIdsSelector);
  const { products: crossSellProducts, loading } =
    useCrossSellProducts(crossSellIds);

  useEffect(() => {
    if (!loading && crossSellProducts.length === 0) {
      handleCheckout();
    }
  }, [handleCheckout, crossSellProducts, loading]);

  if (loading) {
    return (
      <div className={styles.crossSell}>
        <Spinner animation="border" />
      </div>
    );
  }
  return (
    <div className={styles.crossSell}>
      <Text.P thickness="thin" classNames={[styles.crossSellP]}>
        Nếu bạn mua để tặng người ấy thì Đồ Chơi Chữ có thêm lựa chọn cho bạn:
      </Text.P>
      <Row className={styles.crossSellItemsWrapper}>
        {crossSellProducts.map((product) => (
          <Col xs={6} key={product.slug}>
            <CrossSellItem product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CrossSell;
