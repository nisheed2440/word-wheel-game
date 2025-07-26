"use client";

import { useRef, useEffect } from 'react';

interface MobileTouchAreaProps {
  children: React.ReactNode;
  onTouch?: (x: number, y: number) => void;
  className?: string;
}

export function MobileTouchArea({ 
  children, 
  onTouch, 
  className = "" 
}: MobileTouchAreaProps) {
  const areaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const area = areaRef.current;
    if (!area) return;

    const handleTouch = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (e.touches.length > 0 && onTouch) {
        const touch = e.touches[0];
        const rect = area.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        onTouch(x, y);
      }
    };

    // Prevent all default touch behaviors
    const preventDefault = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    area.addEventListener('touchstart', handleTouch, { passive: false });
    area.addEventListener('touchmove', preventDefault, { passive: false });
    area.addEventListener('touchend', preventDefault, { passive: false });
    area.addEventListener('touchcancel', preventDefault, { passive: false });

    return () => {
      area.removeEventListener('touchstart', handleTouch);
      area.removeEventListener('touchmove', preventDefault);
      area.removeEventListener('touchend', preventDefault);
      area.removeEventListener('touchcancel', preventDefault);
    };
  }, [onTouch]);

  return (
    <div
      ref={areaRef}
      className={`${className}`}
      style={{
        touchAction: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none',
        WebkitTouchCallout: 'none',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {children}
    </div>
  );
} 