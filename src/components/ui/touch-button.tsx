"use client";

import { forwardRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TouchButtonProps extends React.ComponentProps<typeof Button> {
  onTouchStart?: (e: React.TouchEvent) => void;
  onTouchEnd?: (e: React.TouchEvent) => void;
  onTouchMove?: (e: React.TouchEvent) => void;
  preventTouchDefault?: boolean;
}

export const TouchButton = forwardRef<HTMLButtonElement, TouchButtonProps>(
  ({ 
    className, 
    onTouchStart, 
    onTouchEnd, 
    onTouchMove, 
    onClick,
    preventTouchDefault = true,
    ...props 
  }, ref) => {
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
      if (preventTouchDefault) {
        e.stopPropagation();
      }
      onTouchStart?.(e);
    }, [onTouchStart, preventTouchDefault]);

    const handleTouchEnd = useCallback((e: React.TouchEvent) => {
      if (preventTouchDefault) {
        e.stopPropagation();
      }
      onTouchEnd?.(e);
    }, [onTouchEnd, preventTouchDefault]);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
      if (preventTouchDefault) {
        e.stopPropagation();
      }
      onTouchMove?.(e);
    }, [onTouchMove, preventTouchDefault]);

    const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      // Let all click events through - browser handles touch->click conversion
      onClick?.(e);
    }, [onClick]);

    return (
      <Button
        ref={ref}
        className={cn(
          "select-none", // Prevent text selection but allow touch
          className
        )}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        onClick={handleClick}
        style={{
          WebkitUserSelect: 'none',
          userSelect: 'none',
          WebkitTouchCallout: 'none',
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation', // Allow click events but prevent other gestures
        }}
        {...props}
      />
    );
  }
);

TouchButton.displayName = "TouchButton"; 