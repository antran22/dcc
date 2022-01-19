import React, { useState } from 'react';
import { AiFillQuestionCircle as Question } from 'react-icons/ai';
import { c } from '#/utils/classNameParser';
import styles from './ItemInformation.module.scss';
import Text from '#/components/Text';
import Button from '#/components/Button';
import ModalWrapper from '#/components/ModalWrapper';

const ItemInformation: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles['item-information']}>
      <div
        className={c([
          styles['item-information-box'],
          styles['item-information-box-big'],
        ])}
      >
        <Text.SpecialTitle color="cyan">Y Nghia</Text.SpecialTitle>
        <Text.P thickness="thin">
          Kiểm soát cảm xúc trong tình huống bất ngờ, luôn bình tĩnh trong tâm
          với chiếc “bình tĩnh” trong tay.
        </Text.P>
        <Button
          classNames={[styles['item-information-box-btn']]}
          color="black"
          variant="underscore"
          onClick={() => setShowModal(true)}
        >
          Doc Them
        </Button>
      </div>
      <div
        className={c([
          styles['item-information-box'],
          styles['item-information-box-big'],
        ])}
      >
        <Text.SpecialTitle color="nude">Cong nang</Text.SpecialTitle>
        <Text.P thickness="thin">
          Giữ nhiệt Đựng đồ take-away Bảo vệ môi trường
        </Text.P>
      </div>
      <Button
        classNames={[styles['item-information-box-small-btn']]}
        color="black"
        variant="outline"
        onClick={() => setShowModal(true)}
      >
        <div
          className={c([
            styles['item-information-box'],
            styles['item-information-box-small'],
          ])}
        >
          <Text.P>450ML</Text.P>
          <Question color="grey" />
        </div>
      </Button>

      <ModalWrapper visible={showModal} onClose={() => setShowModal(false)}>
        <div>Hello world</div>
      </ModalWrapper>
    </div>
  );
};

export default ItemInformation;
