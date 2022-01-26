import c from "classnames";
import React from "react";
import mainPageStyles from "../MainContent/MainContent.module.scss";
import styles from "./SectionThree.module.scss";
import SquareContent, {SquareContentData} from "./SquareContent";

const SectionThree: React.FC = () => {
  const data: SquareContentData[] = [
    {
      title: "Nội dung",
      titleColor: "cyan",
      details:
        "Hoạt động trên nền tảng mạng xã hội, chúng tôi sáng tác các nội dung chơi chữ dưới định dạng đoản ngôn, thơ, hội thoại…",
    },
    {
      title: "Sản phẩm",
      titleColor: "nude",
      details:
        "Kinh doanh online và ký gửi, chúng tôi sáng tạo các sản phẩm chơi chữ như “bình yên”, “bình tĩnh”, “túi bụi”, “ốp la”,…",
    },
  ];

  return (
    <article
      className={c([
        styles["about-page-main-content-section-three"],
        mainPageStyles["about-page-main-content-section"],
      ])}
    >
      {data.map((squareContentProps, i) => (
        <SquareContent {...squareContentProps} key={i} />
      ))}
    </article>
  );
};

export default SectionThree;
