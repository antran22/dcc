import React from 'react';
import Image from 'next/image';
import Divider from '../../../shared/components/Divider';
import Text from '../../../shared/components/Text';
import styles from './MainContent.module.scss';
import { assets } from '../../../assets';

const MainContent: React.FC = () => {
  return (
    <main className={styles['about-page-main-content']}>
      {/* TODO: Change to SVG */}
      <h1>CAU CHUYEN</h1>
      <Divider
        classNames={[styles['about-page-main-content-divider']]}
      ></Divider>
      <article className={styles['about-page-main-content-section-one']}>
        <div className={styles['about-page-main-content-section-one-label']}>
          <Text.SpecialTitle color="nude">{'"Chơi chữ"'}</Text.SpecialTitle>
        </div>
        <div className={styles['about-page-main-content-section-one-content']}>
          {/* TODO: Change to Text.P */}
          <p style={{ margin: 0, marginBottom: '2rem' }}>
            là một nghệ thuật độc đáo của ngôn từ, lợi dụng sơ hở trong cấu trúc
            ngôn ngữ để tạo ra nhiều lớp nghĩa trong ngữ cảnh cụ thể. Chơi chữ
            mang đến sự giải trí, châm biếm và những suy tưởng cho người đọc.
            Xuất hiện trong thi ca, quảng cáo và những mẩu chuyện hàng ngày,
            chơi chữ làm cho đời sống thêm phong phú, sâu sắc và tươi vui.
          </p>

          <Image
            src={assets.aboutContentOne}
            alt="Do Choi Chu Cafe"
            layout="responsive"
          ></Image>
        </div>
      </article>
    </main>
  );
};

export default MainContent;
