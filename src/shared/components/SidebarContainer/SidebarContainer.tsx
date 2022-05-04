import Button from "#/components/Button";
import c from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineClose as Cross } from "react-icons/ai";
import styles from "./SidebarContainer.module.scss";

const CROSS_SIZE = 20;

interface SidebarContainerProps {
  title: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  openFrom?: "left" | "right";
  sidebarIsOpen: boolean;
  setSidebarIsOpen: (isOpen: boolean) => void;
}

const SidebarContainer: React.FC<SidebarContainerProps> = ({
  title,
  children,
  footer,
  openFrom = "right",
  sidebarIsOpen,
  setSidebarIsOpen,
}) => {
  const [visible, setVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleContainerClick = useCallback(
    (event: MouseEvent) => {
      const contentNode = contentRef.current;
      if (contentNode && !contentNode.contains(event.target as Node)) {
        setSidebarIsOpen(false);
      }
    },
    [setSidebarIsOpen]
  );

  useEffect(() => {
    if (sidebarIsOpen) {
      setVisible(sidebarIsOpen);
    } else {
      setTimeout(() => setVisible(sidebarIsOpen), 550);
    }
  }, [sidebarIsOpen]);

  useEffect(() => {
    document.addEventListener("mousedown", handleContainerClick);

    return () =>
      document.removeEventListener("mousedown", handleContainerClick);
  }, [handleContainerClick]);

  return (
    <div
      className={c([
        styles.sidebarContainer,
        styles[`sidebar-container-${sidebarIsOpen ? "open" : "close"}`],
      ])}
      style={{
        visibility: visible ? "visible" : "hidden",
      }}
    >
      <div
        ref={contentRef}
        className={c([
          styles["sidebar-container-content"],
          styles[
            `sidebar-container-content-${sidebarIsOpen ? "open" : "close"}`
          ],
        ])}
        style={{
          [openFrom]: 0,
        }}
      >
        <div className={styles.sidebarContainerContentHeader}>
          <div className={styles.sidebarContainerContentHeaderTitle}>
            {title}
          </div>
          <Button
            classNames={[styles.sidebarContainerButton]}
            onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
            color="white"
          >
            <Cross size={CROSS_SIZE} />
          </Button>
        </div>

        <div className={styles.sidebarContainerContentBody}>{children}</div>
        <div className={styles.sidebarContainerContentFooter}>{footer}</div>
      </div>
    </div>
  );
};

export default SidebarContainer;
