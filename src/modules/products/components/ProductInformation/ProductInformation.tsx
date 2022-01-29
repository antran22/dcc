import Button from "#/components/Button";
import ModalWrapper from "#/components/ModalWrapper";
import Text from "#/components/Text";
import { Product } from "#/types";
import { useMarkdownProcessor } from "#/utils/markdown";
import ProductSizePicker from "@/modules/products/components/ProductInformation/ProductSizePicker";
import c from "classnames";
import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { AiFillQuestionCircle as Question } from "react-icons/ai";
import ColorPicker from "./ProductColorPicker";
import styles from "./ProductInformation.module.scss";

interface ItemInformationProps {
  product: Product;
}

const ProductInformation: React.FC<ItemInformationProps> = ({ product }) => {
  const [showMeaningModal, setShowMeaningModal] = useState(false);
  const [showSizeGuidanceModal, setShowSizeGuidanceModal] = useState(false);
  const [showSpecModal, setShowSpecModal] = useState(false);
  const productMeaningContent = useMarkdownProcessor(product.meaning);
  const productUsageContent = useMarkdownProcessor(product.usage);
  const productSpecContent = useMarkdownProcessor(product.specifications);
  const sizeGuidanceContent = useMarkdownProcessor(product.size_guidance);

  return (
    <>
      <Row className={c("m-3", "px-3", styles.itemInformation)}>
        {product.colors.length > 0 && (
          <Col
            xs={{ offset: 3, span: 6 }}
            lg={{ offset: 2, span: 8 }}
            xl={{ offset: 4, span: 4 }}
          >
            <ColorPicker product={product} />
          </Col>
        )}

        <Col xs={{ span: 10, offset: 1 }} lg={{ span: 5, offset: 0 }}>
          <div className={styles.itemInformationBox}>
            <Text.SpecialTitle color="cyan">Ý nghĩa</Text.SpecialTitle>
            <Text.P thickness="thin">{product.meaning_short}</Text.P>
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
              <Text.P thickness="thin">{productUsageContent}</Text.P>
            </div>

            {product.sizes.length > 0 && (
              <ProductSizePicker
                product={product}
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
                <Text.P>{product.specifications_short}</Text.P>
                <Question color="grey" />
              </div>
            </Button>
          </div>
        </Col>
      </Row>

      <ModalWrapper
        className={styles["item-modal"]}
        visible={showSizeGuidanceModal}
        onClose={() => setShowSizeGuidanceModal(false)}
      >
        {sizeGuidanceContent}
      </ModalWrapper>

      <ModalWrapper
        className={styles["item-modal"]}
        visible={showMeaningModal}
        onClose={() => setShowMeaningModal(false)}
      >
        {productMeaningContent}
      </ModalWrapper>

      <ModalWrapper
        className={styles.itemModal}
        visible={showSpecModal}
        onClose={() => setShowSpecModal(false)}
      >
        {productSpecContent}
      </ModalWrapper>
    </>
  );
};

export default ProductInformation;
