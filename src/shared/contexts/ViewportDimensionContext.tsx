import React, {createContext, useCallback, useEffect, useState} from "react";
import {BREAKPOINT_MOBILE, BREAKPOINT_TABLET} from "#/styles/constants";

export const ViewportDimensionContext = createContext<ViewportDimensionState>({
  width: 2000,
  height: 2000,
  currentMode: "desktop",
});

export function ViewportDimensionProvider({ children }: ViewportProviderProps) {
  const [viewportDimension, setViewportDimension] =
    useState<ViewportDimensionState>({
      width: 2000,
      height: 2000,
      currentMode: "desktop",
    });

  const getCurrentMode = (width: number): ViewportModes => {
    if (width <= BREAKPOINT_MOBILE) {
      return "mobile";
    } else if (width <= BREAKPOINT_TABLET) {
      return "tablet";
    } else {
      return "desktop";
    }
  };

  const handleWindowResize = useCallback(() => {
    const currentMode = getCurrentMode(window.innerWidth);
    setViewportDimension({
      width: window.innerWidth,
      height: window.innerHeight,
      currentMode: currentMode,
    });
  }, []);

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [handleWindowResize]);

  return (
    <ViewportDimensionContext.Provider value={viewportDimension}>
      {children}
    </ViewportDimensionContext.Provider>
  );
}

interface ViewportProviderProps {
  children: React.ReactNode;
}

interface ViewportDimensionState {
  width: number;
  height: number;
  currentMode: ViewportModes;
}

export type ViewportModes = "desktop" | "tablet" | "mobile";
