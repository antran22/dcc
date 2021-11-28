import React from 'react';
import Image from 'next/image';
import { assets } from '../../../assets';
import { c } from '../../../shared/utils/classNameParser';
import styles from './SectionTwo.module.scss';
import mainPageStyles from '../MainContent/MainContent.module.scss';

const SectionTwo: React.FC = () => {
  return (
    <article
      className={c([
        styles['about-page-main-content-section-two'],
        mainPageStyles['about-page-main-content-section'],
      ])}
    >
      <p style={{ margin: 0, marginBottom: '2rem' }}>
        Đồ chơi chữ là những người tìm thấy khoái lạc trong việc mò mẫm ngôn
        ngữ, chúng tôi chơi chữ để thỏa mãn bản thân cũng như đem lại năng lượng
        tích cực cho độc giả, thông qua nội dung, sản phẩm và dịch vụ, như sau:
      </p>
      <Image
        src={assets.aboutContentTwo}
        alt="Do Choi Chu Founders"
        layout="responsive"
      ></Image>
    </article>
  );
};

export default SectionTwo;
