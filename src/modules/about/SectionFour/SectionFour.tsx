import React from "react";
import c from "classnames";
import mainPageStyles from "../MainContent/MainContent.module.scss";
import styles from "./SectionFour.module.scss";
import Text from "#/components/Text";

const SectionFour: React.FC = () => {
  return (
    <article
      className={c(
        mainPageStyles["about-page-main-content-section"],
        styles["about-page-main-content-section-four"],
      )}
    >
      <Text.P
        thickness="thin"
        classNames={[styles["about-page-main-content-section-four-p"]]}
      >
        Sở hữu Fanpage hơn 200,000 lượt thích với tương tác khủng trên mỗi bài
        đăng, chúng tôi nhận chia sẻ, quảng cáo và review sản phẩm từ các cá
        nhân và nhãn hàng có nhu cầu. Thông qua Đồ Chơi Chữ, sản phẩm của bạn có
        thể tiếp cận rộng rãi và để lại ấn tượng sâu đậm tới các khách hàng trẻ,
        thích những điều mới mẻ, sáng tạo và tích cực.
      </Text.P>
    </article>
  );
};

export default SectionFour;
