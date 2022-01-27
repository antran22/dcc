import Button from "#/components/Button";
import { CartSidebarContext } from "#/contexts/CartSidebarContext";
import React, { useCallback, useContext } from "react";
import styles from "./EmptyCartSidebar.module.scss";

const EmptyCartSidebar: React.FC = () => {
  const { setOpenCartBar } = useContext(CartSidebarContext);

  const handleCtaClick = useCallback(() => {
    setOpenCartBar(false);
  }, [setOpenCartBar]);

  return (
    <div className={styles["empty-cart-sidebar"]}>
      <Button
        variant="fill"
        color="black"
        mode="fill-parent"
        onClick={handleCtaClick}
      >
        TIẾP TỤC MUA SẮM
      </Button>
    </div>
  );
};

export default EmptyCartSidebar;
