import Button from "#/components/Button";
import c from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./ModalWrapper.module.scss";
import { AiOutlineClose } from "react-icons/ai";

interface ModalWrapperProps {
  className?: string;
  visible: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  children,
  visible,
  onClose,
  className,
}) => {
  const [wrapperVisible, setWrapperVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleClickOutsideContent = useCallback(
    (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideContent);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideContent);
  }, [handleClickOutsideContent]);

  useEffect(() => {
    if (visible) {
      setWrapperVisible(visible);
    } else {
      setTimeout(() => setWrapperVisible(visible), 550);
    }
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <div
      style={{
        visibility: wrapperVisible ? "visible" : "hidden",
      }}
      className={c(
        styles.modalWrapper,
        styles[`modal-wrapper-${visible ? "show" : "hide"}`]
      )}
    >
      <div
        ref={contentRef}
        className={c(styles["modal-wrapper-content"], className)}
      >
        <div>{children}</div>

        <div className={styles.modalWrapperButtonContainer}>
          <Button
            color="black"
            variant="fill"
            classNames={[styles.modalWrapperButton]}
            onClick={onClose}
          >
            <AiOutlineClose />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;
