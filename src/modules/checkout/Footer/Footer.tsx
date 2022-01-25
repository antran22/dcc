import React from "react";
import Text from "#/components/Text";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles["footer"]}>
      <Text.P thickness="thin">© 2022 Bản quyền thuộc Đồ Chơi Chữ</Text.P>
    </footer>
  );
};

export default Footer;
