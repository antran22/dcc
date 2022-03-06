import Button from "#/components/Button";
import ModalWrapper from "#/components/ModalWrapper";
import Text from "#/components/Text";
import {
  extractRichTextAttributeValue,
  RichTextRenderer,
} from "#/utils/editorJS";
import {
  getProductAttributeMap,
  getProductColors,
  getProductSizes,
  Product,
} from "@/graphql/products";
import { useAppDispatch } from "@/redux/hooks";
import c from "classnames";
// @ts-ignore
import editorJSHTML from "editorjs-html";
import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { AiFillQuestionCircle as Question } from "react-icons/ai";
import ColorPicker from "./ProductColorPicker";
import styles from "./ProductInformation.module.scss";
import ProductSizePicker from "./ProductSizePicker";

interface ItemInformationProps {
  product: Product;
}

const ProductInformation: React.FC<ItemInformationProps> = ({ product }) => {
  const [showMeaningModal, setShowMeaningModal] = useState(false);
  const [showSizeGuidanceModal, setShowSizeGuidanceModal] = useState(false);
  const [showSpecModal, setShowSpecModal] = useState(false);

  const dispatch = useAppDispatch();

  const productAttribute = getProductAttributeMap(product);

  const productDescriptionBrief = extractRichTextAttributeValue(
    productAttribute["description-brief"]
  );
  const productUsage = extractRichTextAttributeValue(productAttribute["usage"]);

  const productSpecs = extractRichTextAttributeValue(productAttribute["specs"]);
  const productSpecsBrief = extractRichTextAttributeValue(
    productAttribute["specs-brief"]
  );

  const productSizeGuidance = extractRichTextAttributeValue(
    productAttribute["size-guidance"]
  );

  const colors = getProductColors(product);
  const sizes = getProductSizes(product);

  return (
    <div className={styles.itemInformationContainer}>
      <Row className={c("m-3", "px-3", styles.itemInformation)}>
        {colors.length > 1 && (
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
              <RichTextRenderer input={productDescriptionBrief} />
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

            {sizes.length > 1 && (
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
                  <RichTextRenderer input={productSpecsBrief} />
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
        <RichTextRenderer input={productSpecs} />
      </ModalWrapper>
    </div>
  );
};

export default ProductInformation;
