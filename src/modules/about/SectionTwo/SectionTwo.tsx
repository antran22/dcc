import Text from "#/components/Text";
import {assets} from "@/assets";
import c from "classnames";
import Image from "next/image";
import React from "react";
import mainPageStyles from "../MainContent/MainContent.module.scss";
import styles from "./SectionTwo.module.scss";

const SectionTwo: React.FC = () => {
  return (
    <article
      className={c([
        styles["about-page-main-content-section-two"],
        mainPageStyles["about-page-main-content-section"],
      ])}
    >
      <Text.P
        thickness="thin"
        classNames={[styles["about-page-main-content-section-two-p"]]}
      >
        Đồ chơi chữ là những người tìm thấy khoái lạc trong việc mò mẫm ngôn
        ngữ, chúng tôi chơi chữ để thỏa mãn bản thân cũng như đem lại năng lượng
        tích cực cho độc giả, thông qua nội dung, sản phẩm và dịch vụ, như sau:
      </Text.P>
      <Image
        src={assets.aboutContentTwo}
        alt="Do Choi Chu Founders"
        layout="responsive"
      />
    </article>
  );
};

export default SectionTwo;
