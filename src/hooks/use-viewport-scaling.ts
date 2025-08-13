"use client";

import { useState, useEffect } from "react";

interface ViewportScaling {
  scale: number;
  containerHeight: number;
  currentWordScale: number;
  wheelScale: number;
  wheelContainerHeight: number;
  availableHeight: number;
  availableWidth: number;
}

export function useViewportScaling(): ViewportScaling {
  const [scaling, setScaling] = useState<ViewportScaling>({
    scale: 1,
    containerHeight: 800,
    currentWordScale: 1,
    wheelScale: 1,
    wheelContainerHeight: 400,
    availableHeight: 800,
    availableWidth: 400,
  });

  useEffect(() => {
    const calculateScaling = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Reserve space for header (mobile nav) and bottom elements
      const headerHeight = 60; // Approximate height of MobileNav
      const bottomSpacing = 120; // Space for "Words Left" text and Check Word button
      const currentWordHeight = 100; // Approximate height of CurrentWord component
      const padding = 32; // General padding
      
      const availableHeight = viewportHeight - headerHeight - bottomSpacing - padding;
      const availableWidth = viewportWidth - padding;
      
      // WordWheel base dimensions (largest wheel is 380px)
      const wheelBaseSize = 380;
      
      // Calculate scale factors
      const wheelWidthScale = Math.min(availableWidth / wheelBaseSize, 1);
      const wheelHeightScale = Math.min((availableHeight - currentWordHeight) / wheelBaseSize, 1);
      const wheelScale = Math.min(wheelWidthScale, wheelHeightScale);
      
      // CurrentWord scaling should be less aggressive and smaller
      const currentWordScale = wheelScale;
      
      // Overall scale is the minimum of both
      const overallScale = Math.min(wheelScale, currentWordScale);
      
      // Calculate final container height based on scaled components
      const scaledWheelSize = wheelBaseSize * wheelScale;
      const scaledCurrentWordHeight = currentWordHeight * currentWordScale;
      const containerHeight = scaledWheelSize + scaledCurrentWordHeight + bottomSpacing + headerHeight;
      
      // Calculate wheel container height (includes some padding)
      const wheelContainerHeight = scaledWheelSize + 32; // Add some padding
      
      setScaling({
        scale: overallScale,
        containerHeight: Math.min(containerHeight, viewportHeight),
        currentWordScale,
        wheelScale,
        wheelContainerHeight,
        availableHeight,
        availableWidth,
      });
    };

    // Calculate on mount
    calculateScaling();

    // Recalculate on resize
    const handleResize = () => {
      calculateScaling();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return scaling;
}
