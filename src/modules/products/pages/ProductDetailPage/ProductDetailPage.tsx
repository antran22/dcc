import React, { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Text from "#/components/Text";
import styles from "./ProductDetailPage.module.scss";
import QuantityControl from "../../components/QuantityControl";
import ProductInformation from "../../components/ProductInformation/ProductInformation";
import Head from "next/head";
import { useGetProductBySlugQuery } from "@/redux/slices/api";
import { formatCurrency } from "#/utils/number";
import ProductPreview from "@/modules/products/pages/ProductDetailPage/ProductPreview";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import c from "classnames";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  previewImageSelector,
  resetProduct,
  setProduct,
} from "@/redux/slices/productView";

const ProductDetailPage: NextPage = () => {
  const router = useRouter();

  const itemId = router.query.itemId as string;

  const { data: product, isLoading } = useGetProductBySlugQuery(itemId ?? "1");

  const dispatch = useAppDispatch();
  const previewImages = useAppSelector(previewImageSelector);

  useEffect(() => {
    if (!isLoading && product) {
      dispatch(setProduct(product));
    }
    return () => {
      dispatch(resetProduct());
    };
  }, [dispatch, isLoading, product]);

  if (!isLoading && !product) {
    router.push("/404");
    return null;
  }
  if (isLoading || !product) {
    return <div />;
  }

  return (
    <>
      <Head>
        <title>{product.title}</title>
      </Head>

      <Row className="h-100">
        <Col
          as="aside"
          xs={12}
          lg={5}
          className={styles.productsDetailsPagePreview}
        >
          <ProductPreview images={previewImages} />
        </Col>

        <Col
          as="main"
          xs={12}
          lg={7}
          className="d-flex flex-column justify-content-between px-2"
        >
          <h1
            className={c(
              styles["products-details-page-content-title"],
              "my-lg-5"
            )}
            style={{ fontSize: 60 }}
          >
            {product.title}
          </h1>

          <ProductInformation product={product} />

          <div className={styles.productsDetailsPageContentFooter}>
            <Text.P size="large">{formatCurrency(product.price)}</Text.P>
            <QuantityControl productId={itemId} />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetailPage;
