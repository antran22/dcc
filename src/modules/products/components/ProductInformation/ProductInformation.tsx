import React, { useState } from "react";
import Button from "#/components/Button";
import ModalWrapper from "#/components/ModalWrapper";
import Text from "#/components/Text";
import {
  getProductAttributeMap,
  getProductColors,
  getProductSizes,
  SingleProductDetail,
} from "@/graphql/products";
import c from "classnames";
import _ from "lodash";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// @ts-ignore
import editorJSHTML from "editorjs-html";
import { AiFillQuestionCircle as Question } from "react-icons/ai";
import ColorPicker from "./ProductColorPicker";
import ProductSizePicker from "./ProductSizePicker";
import styles from "./ProductInformation.module.scss";

interface ItemInformationProps {
  product: SingleProductDetail;
}

const edJSParser = editorJSHTML();

interface RichTextRendererProps {
  input: string;
}
const RichTextRenderer: React.FC<RichTextRendererProps> = ({ input }) => {
  if (input) {
    const edJSData = JSON.parse(input);
    const html = edJSParser.parse({ blocks: edJSData.blocks ?? [] });
    return <div dangerouslySetInnerHTML={{ __html: html.join("") }} />;
  }
  return null;
};

const ProductInformation: React.FC<ItemInformationProps> = ({ product }) => {
  const [showMeaningModal, setShowMeaningModal] = useState(false);
  const [showSizeGuidanceModal, setShowSizeGuidanceModal] = useState(false);
  const [showSpecModal, setShowSpecModal] = useState(false);

  const productAttribute = getProductAttributeMap(product);

  const productUsage = _.first(productAttribute["usage"])?.richText;

  const productSpec = _.first(productAttribute["spec"])?.richText;

  const productSizeGuidance = _.first(
    productAttribute["size-guidance"]
  )?.richText;

  const colors = getProductColors(product);
  const sizes = getProductSizes(product);

  return (
    <div className={styles.itemInformationContainer}>
      <Row className={c("m-3", "px-3", styles.itemInformation)}>
        {colors.length > 0 && (
          <Col
            xs={{ offset: 3, span: 6 }}
            lg={{ offset: 2, span: 8 }}
            xl={{ offset: 4, span: 4 }}
          >
            <ColorPicker colors={colors} />
          </Col>
        )}

        <Col xs={{ span: 10, offset: 1 }} lg={{ span: 5, offset: 0 }}>
          <div className={styles.itemInformationBox}>
            <Text.SpecialTitle color="cyan">Ý nghĩa</Text.SpecialTitle>
            <Text.P thickness="thin" as="div">
              <RichTextRenderer input={product.description} />
            </Text.P>
            <Button
              classNames={[styles["item-information-box-btn"]]}
              color="black"
              variant="underscore"
              onClick={() => setShowMeaningModal(true)}
            >
              Tìm hiểu thêm
            </Button>
          </div>
        </Col>

        <Col xs={{ span: 8, offset: 2 }} lg={{ span: 7, offset: 0 }}>
          <div className="d-flex flex-column justify-content-center align-content-center align-content-lg-start">
            <div
              className={c(
                styles.itemInformationBox,
                styles.itemInformationFixBorderLeft
              )}
            >
              <Text.SpecialTitle color="nude">Công năng</Text.SpecialTitle>
              <div className={styles.itemInformationUsage}>
                <RichTextRenderer input={productUsage} />
              </div>
            </div>

            {sizes.length > 0 && (
              <ProductSizePicker
                sizes={sizes}
                handleOpenGuidance={() => setShowSizeGuidanceModal(true)}
                className={c(
                  styles.itemInformationBox,
                  styles.itemInformationFixBorderTop,
                  styles.itemInformationFixBorderLeft
                )}
              />
            )}

            <Button
              classNames={[
                styles.itemInformationFixBorderTop,
                styles.itemInformationFixBorderLeft,
                styles.itemButtonCenter,
              ]}
              onClick={() => setShowSpecModal(true)}
              color="black"
              variant="outline"
            >
              <div className="d-flex justify-content-center flex-row align-items-center">
                <Text.P thickness="thin" as="div">
                  <RichTextRenderer input={productSpec} />
                </Text.P>
                <Question color="grey" />
              </div>
            </Button>
          </div>
        </Col>
      </Row>

      <ModalWrapper
        className={styles.itemModal}
        visible={showSizeGuidanceModal}
        onClose={() => setShowSizeGuidanceModal(false)}
      >
        <RichTextRenderer input={productSizeGuidance} />
      </ModalWrapper>

      <ModalWrapper
        className={styles.itemModal}
        visible={showMeaningModal}
        onClose={() => setShowMeaningModal(false)}
      >
        <RichTextRenderer input={product.description} />
      </ModalWrapper>

      <ModalWrapper
        className={styles.itemModal}
        visible={showSpecModal}
        onClose={() => setShowSpecModal(false)}
      >
        <RichTextRenderer input={productSpec} />
      </ModalWrapper>
    </div>
  );
};

export default ProductInformation;
