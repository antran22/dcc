import React, { useMemo } from "react";
import { DCCColors } from "#/types";
import c from "classnames";
import specialTitleStyles from "./SpecialTitle.module.scss";
import pStyles from "./P.module.scss";

interface TextProps {
  children: string | React.ReactNode[];
  classNames?: string[];
}

interface SpecialTitleProps extends TextProps {
  color: DCCColors;
  rotation?: number | "random";
}

const SpecialTitle: React.FC<SpecialTitleProps> = ({
  color,
  children,
  rotation,
  classNames = [],
}: SpecialTitleProps) => {
  const rotationLevel = useMemo(() => {
    if (!rotation || rotation === "random") {
      return Math.round(Math.random() * 10 - 5);
    } else {
      return rotation;
    }
  }, [rotation]);

  return (
    <div
      className={c(
        specialTitleStyles[`special-title-${color}`],
        specialTitleStyles[`special-title-rotate-${rotationLevel}`],
        ...classNames
      )}
    >
      {children}
    </div>
  );
};

interface PProps extends TextProps {
  size?: "large" | "normal" | "small";
  thickness?: "thick" | "normal" | "thin";
  style?: React.CSSProperties;
}
const P: React.FC<PProps> = ({
  children,
  size = "normal",
  thickness = "normal",
  style,
  classNames = [],
}) => {
  return (
    <p
      style={style}
      className={c([
        pStyles[`p-thickness-${thickness}`],
        pStyles[`p-size-${size}`],
        ...classNames,
      ])}
    >
      {children}
    </p>
  );
};

const Text = {
  SpecialTitle,
  P,
};

export default Text;
