import { DCCColors } from "#/types";
import c from "classnames";
import dynamic from "next/dynamic";
import { ReactComponentLike } from "prop-types";
import React, { useMemo } from "react";
import pStyles from "./P.module.scss";
import specialTitleStyles from "./SpecialTitle.module.scss";

interface TextProps {
  children: string | React.ReactNode;
  classNames?: string[];
}

interface SpecialTitleProps extends TextProps {
  as?: ReactComponentLike;
  color: DCCColors;
  rotation?: number | "random";
}

const SpecialTitle: React.FC<SpecialTitleProps> = ({
  color,
  children,
  rotation,
  classNames = [],
  as,
}: SpecialTitleProps) => {
  const rotationLevel = useMemo(() => {
    if (!rotation || rotation === "random") {
      return Math.round(Math.random() * 10 - 5);
    } else {
      return rotation;
    }
  }, [rotation]);

  const Component = as ?? "div";

  return (
    <Component
      className={c(
        specialTitleStyles[`special-title-${color}`],
        specialTitleStyles[`special-title-rotate-${rotationLevel}`],
        ...classNames
      )}
    >
      {children}
    </Component>
  );
};

const SpecialTitleWithNoSSR = dynamic(() => Promise.resolve(SpecialTitle), {
  ssr: false,
});

interface PProps extends TextProps {
  as?: ReactComponentLike;
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
  as,
}) => {
  const Component = as ?? "p";
  return (
    <Component
      style={style}
      className={c([
        pStyles[`p-thickness-${thickness}`],
        pStyles[`p-size-${size}`],
        ...classNames,
      ])}
    >
      {children}
    </Component>
  );
};

const Text = {
  SpecialTitle: SpecialTitleWithNoSSR,
  P,
};

export default Text;
