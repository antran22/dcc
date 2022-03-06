import Button from "#/components/Button";
import ModalWrapper from "#/components/ModalWrapper";
import Text from "#/components/Text";
import {
  extractRichTextAttributeValue,
  RichTextRenderer,
} from "#/utils/editorJS";
import { getProductAttributeMap, Product } from "@/graphql/products";
import c from "classnames";
import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import styles from "./ComboInformation.module.scss";

interface ComboInformationProps {
  combo: Product;
}

const ComboInformation: React.FC<ComboInformationProps> = ({ combo }) => {
  const [showMeaningModal, setShowMeaningModal] = useState(false);

  const comboAttribute = getProductAttributeMap(combo);

  const descriptionBrief = extractRichTextAttributeValue(
    comboAttribute["description-brief"]
  );

  const contentDescription = extractRichTextAttributeValue(
    comboAttribute["combo-content-description"]
  );

  return (
    <div className={styles.comboInformation}>
      <Row className={c("m-3", "px-3", styles.comboInformation)}>
        <Col xs={{ span: 10, offset: 1 }} lg={{ span: 5, offset: 0 }}>
          <div className={styles.comboInformationBox}>
            <Text.SpecialTitle color="cyan">Ý nghĩa</Text.SpecialTitle>
            <Text.P thickness="thin" as="div">
              <RichTextRenderer input={descriptionBrief} />
            </Text.P>
            <Button
              classNames={[styles["combo-information-box-btn"]]}
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
                styles.comboInformationBox,
                styles.comboInformationFixBorderLeft
              )}
            >
              <Text.SpecialTitle color="nude">Bao gồm</Text.SpecialTitle>
              <Text.P as="div" thickness="thin">
                <RichTextRenderer input={contentDescription} />
              </Text.P>
            </div>
          </div>
        </Col>
      </Row>

      <ModalWrapper
        className={styles.comboModal}
        visible={showMeaningModal}
        onClose={() => setShowMeaningModal(false)}
      >
        <RichTextRenderer input={combo.description} />
      </ModalWrapper>
    </div>
  );
};

export default ComboInformation;
