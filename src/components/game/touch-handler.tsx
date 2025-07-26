"use client";

import { useEffect, useRef } from 'react';

interface TouchHandlerProps {
  children: React.ReactNode;
  className?: string;
  preventScroll?: boolean;
}

export function TouchHandler({ 
  children, 
  className = "", 
  preventScroll = true 
}: TouchHandlerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e: TouchEvent) => {
      // Only prevent default for non-interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = target.tagName === 'BUTTON' || 
                           target.tagName === 'INPUT' || 
                           target.tagName === 'A' ||
                           target.closest('button') ||
                           target.closest('a') ||
                           target.getAttribute('role') === 'button';
      
      if (preventScroll && !isInteractive) {
        e.preventDefault();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Only prevent scrolling, not button interactions
      const target = e.target as HTMLElement;
      const isInteractive = target.tagName === 'BUTTON' || 
                           target.tagName === 'INPUT' || 
                           target.tagName === 'A' ||
                           target.closest('button') ||
                           target.closest('a') ||
                           target.getAttribute('role') === 'button';
      
      if (preventScroll && !isInteractive) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      // Allow click events to fire for interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = target.tagName === 'BUTTON' || 
                           target.tagName === 'INPUT' || 
                           target.tagName === 'A' ||
                           target.closest('button') ||
                           target.closest('a') ||
                           target.getAttribute('role') === 'button';
      
      if (preventScroll && !isInteractive) {
        e.preventDefault();
      }
    };

    // Add passive: false to ensure preventDefault works
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: false });

    // Prevent context menu on long press
    container.addEventListener('contextmenu', (e) => e.preventDefault());

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('contextmenu', (e) => e.preventDefault());
    };
  }, [preventScroll]);

  return (
    <div
      ref={containerRef}
      className={`game-container ${className}`}
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