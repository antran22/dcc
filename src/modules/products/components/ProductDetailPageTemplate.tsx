import LoadingScreen from "#/components/LoadingScreen";
import QuantityControl from "#/components/QuantityControl";
import Text from "#/components/Text";
import DetailLayout from "#/layout/DetailLayout";
import {
  getPriceStringFromProduct,
  getProductAttributeMap,
  Product,
} from "@/graphql/products";
import styles from "@/modules/products/pages/ProductDetailPage/ProductDetailPage.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  previewImageSelector,
  resetPreviewProduct,
  setViewingProduct,
} from "@/redux/slices/productView";
import _ from "lodash";
import { NextPage } from "next";
import React, { useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

interface ProductDetailPageTemplateProps {
  product: Product;
}

export const ProductDetailPageTemplate: NextPage<
  ProductDetailPageTemplateProps
> = ({ product, children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (product) {
      dispatch(setViewingProduct(product));
    }
    return () => {
      dispatch(resetPreviewProduct());
    };
  }, [dispatch, product]);

  const previewProductImage = useAppSelector(previewImageSelector);

  if (!product) {
    return <LoadingScreen />;
  }

  const attributes = getProductAttributeMap(product);

  const color = _.first(attributes["theme-color"])?.value ?? "#ffffff";

  const giftNames = attributes["gift"]?.map((gift) => gift.name);
  const subtitle = giftNames?.length
    ? `Tặng kèm ${giftNames.join(", ")}`
    : undefined;

  return (
    <DetailLayout
      title={product.name}
      subtitle={subtitle}
      themeColorCode={color}
      previewImages={previewProductImage}
      footer={
        <Container>
          <Row className={styles.footer}>
            <Col
              xs={12}
              md={4}
              className="d-flex justify-content-center align-items-center"
            >
              <Text.P size="large" style={{ textAlign: "center" }}>
                {getPriceStringFromProduct(product)}
              </Text.P>
            </Col>
            <Col xs={12} md={8}>
              <QuantityControl />
            </Col>
          </Row>
        </Container>
      }
    >
      {children}
    </DetailLayout>
  );
};
