import React from 'react';
import Image from 'next/image';

import Text from '#/components/Text';
import { c } from '#/utils/classNameParser';
import { assets } from '@/assets';
import styles from './SectionOne.module.scss';
import mainPageStyles from '../MainContent/MainContent.module.scss';

const SectionOne: React.FC = () => {
  return (
    <article
      className={c([
        styles['about-page-main-content-section-one'],
        mainPageStyles['about-page-main-content-section'],
      ])}
    >
      <div className={styles['about-page-main-content-section-one-label']}>
        <Text.SpecialTitle color="nude">{'"Chơi chữ"'}</Text.SpecialTitle>
      </div>

      <div
        className={c([styles['about-page-main-content-section-one-content']])}
      >
        <Text.P
          thickness="thin"
          classNames={[styles['about-page-main-content-section-one-content-p']]}
        >
          là một nghệ thuật độc đáo của ngôn từ, lợi dụng sơ hở trong cấu trúc
          ngôn ngữ để tạo ra nhiều lớp nghĩa trong ngữ cảnh cụ thể. Chơi chữ
          mang đến sự giải trí, châm biếm và những suy tưởng cho người đọc. Xuất
          hiện trong thi ca, quảng cáo và những mẩu chuyện hàng ngày, chơi chữ
          làm cho đời sống thêm phong phú, sâu sắc và tươi vui.
        </Text.P>

        <Image
          src={assets.aboutContentOne}
          alt="Do Choi Chu Cafe"
          layout="responsive"
        />
      </div>
    </article>
  );
};

export default SectionOne;
