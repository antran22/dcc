import { DCCColors } from "#/types";
import c from "classnames";
import Link from "next/link";
import React from "react";
import styles from "./Button.module.scss";

interface ButtonLinkProps {
  children: React.ReactNode;
  href: string;
  color: DCCColors;
  mode?: "fill-parent" | "contain";
  variant?: "fill" | "outline" | "underscore";
  classNames?: string[];
  onClick?: () => void;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({
  href,
  mode = "contain",
  variant = "fill",
  color,
  children,
  onClick,
  classNames = [],
}: ButtonLinkProps) => {
  return (
    <Link href={href} passHref>
      <a
        onClick={onClick}
        className={c([
          styles.btn,
          styles[`btn-${mode}`],
          styles[`btn-${variant}-${color}`],
          ...classNames,
        ])}
      >
        {children}
      </a>
    </Link>
  );
};

export default ButtonLink;
