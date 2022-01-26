import { DCCColors } from "#/types";
import c from "classnames";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import pStyles from "./P.module.scss";
import specialTitleStyles from "./SpecialTitle.module.scss";

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

const SpecialTitleWithNoSSR = dynamic(() => Promise.resolve(SpecialTitle), {
  ssr: false,
});

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
  SpecialTitle: SpecialTitleWithNoSSR,
  P,
};

export default Text;
