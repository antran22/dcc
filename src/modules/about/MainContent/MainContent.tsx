import Divider from "#/components/Divider";
import Text from "#/components/Text";
import { DCCColors } from "#/types";
import { assets } from "@/assets";

import Image from "next/image";
import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import styles from "./MainContent.module.scss";

const MainContent: React.FC = () => {
  return (
    <main className={styles.mainContent}>
      <h1 className={styles.mainContentTitle}>Câu chuyện</h1>

      <Divider classNames={[styles.mainContentDivider]} />

      <Row>
        <Col xs={12} lg={3}>
          <Text.SpecialTitle color="red-soil">{'"Chơi chữ"'}</Text.SpecialTitle>
        </Col>

        <Col xs={12} lg={9}>
          <Text.P thickness="thin">
            là một nghệ thuật độc đáo của ngôn từ, lợi dụng sơ hở trong cấu trúc
            ngôn ngữ để tạo ra nhiều lớp nghĩa trong ngữ cảnh cụ thể. Chơi chữ
            mang đến sự giải trí, châm biếm và những suy tưởng cho người đọc.
            Xuất hiện trong thi ca, quảng cáo và những mẩu chuyện hàng ngày,
            chơi chữ làm cho đời sống thêm phong phú, sâu sắc và tươi vui.
          </Text.P>

          <div className={styles.mainContentImage}>
            <Image
              src={assets.aboutContentOne}
              className={styles.mainContentImage}
              alt="Do Choi Chu Cafe"
              layout="responsive"
            />
          </div>
        </Col>
      </Row>

      <Text.P thickness="thin">
        Đồ chơi chữ là những người tìm thấy khoái lạc trong việc mò mẫm ngôn
        ngữ, chúng tôi chơi chữ để thỏa mãn bản thân cũng như đem lại năng lượng
        tích cực cho độc giả, thông qua nội dung, sản phẩm và dịch vụ, như sau:
      </Text.P>

      <div className={styles.mainContentImage}>
        <Image
          src={assets.aboutContentTwo}
          alt="Do Choi Chu Founders"
          layout="responsive"
        />
      </div>

      <div className={styles.contentSquareContainer}>
        <ContentSquare
          title="Nội dung"
          titleColor="cyan"
          details="Hoạt động trên nền tảng mạng xã hội, chúng tôi sáng tác các nội dung chơi chữ dưới định dạng đoản ngôn, thơ, hội thoại…"
        />

        <ContentSquare
          title="Sản phẩm"
          titleColor="nude"
          details="Kinh doanh online và ký gửi, chúng tôi sáng tạo các sản phẩm chơi chữ như “bình yên”, “bình tĩnh”, “túi bụi”, “ốp la”,…"
        />
      </div>

      <Text.P thickness="thin">
        Sở hữu Fanpage hơn 200,000 lượt thích với tương tác khủng trên mỗi bài
        đăng, chúng tôi nhận chia sẻ, quảng cáo và review sản phẩm từ các cá
        nhân và nhãn hàng có nhu cầu. Thông qua Đồ Chơi Chữ, sản phẩm của bạn có
        thể tiếp cận rộng rãi và để lại ấn tượng sâu đậm tới các khách hàng trẻ,
        thích những điều mới mẻ, sáng tạo và tích cực.
      </Text.P>
    </main>
  );
};

interface ContentSquareProps {
  title: string;
  titleColor: DCCColors;
  details: string;
}
const ContentSquare: React.FC<ContentSquareProps> = ({
  title,
  titleColor,
  details,
}) => {
  return (
    <div>
      <Text.SpecialTitle color={titleColor}>{title}</Text.SpecialTitle>
      <Text.P thickness="thin">{details}</Text.P>
    </div>
  );
};
export default MainContent;
