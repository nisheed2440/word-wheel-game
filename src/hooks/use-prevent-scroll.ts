import { useEffect } from 'react';

interface UsePreventScrollOptions {
  enabled?: boolean;
  preventDefault?: boolean;
}

export function usePreventScroll({ 
  enabled = true, 
  preventDefault = true 
}: UsePreventScrollOptions = {}) {
  useEffect(() => {
    if (!enabled) return;

    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalWidth = document.body.style.width;
    const originalHeight = document.body.style.height;

    // Prevent page scrolling
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100vh';

    // Prevent touch events from causing page movement, but allow button interactions
    const preventTouchMove = (e: TouchEvent) => {
      if (preventDefault) {
        const target = e.target as HTMLElement;
        const isInteractive = target.tagName === 'BUTTON' || 
                             target.tagName === 'INPUT' || 
                             target.tagName === 'A' ||
                             target.closest('button') ||
                             target.closest('a') ||
                             target.getAttribute('role') === 'button';
        
        if (!isInteractive) {
          e.preventDefault();
        }
      }
    };

    // Prevent wheel events (mouse wheel, trackpad scroll)
    const preventWheel = (e: WheelEvent) => {
      if (preventDefault) {
        e.preventDefault();
      }
    };

    // Add event listeners with passive: false to ensure preventDefault works
    document.addEventListener('touchmove', preventTouchMove, { passive: false });
    document.addEventListener('wheel', preventWheel, { passive: false });

    // Cleanup function
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.width = originalWidth;
      document.body.style.height = originalHeight;
      
      document.removeEventListener('touchmove', preventTouchMove);
      document.removeEventListener('wheel', preventWheel);
    };
  }, [enabled, preventDefault]);
} 