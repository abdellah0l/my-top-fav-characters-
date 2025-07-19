import { useEffect, useRef } from 'react';

interface SwipeHandlerProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  children: React.ReactNode;
}

const SwipeHandler = ({ onSwipeLeft, onSwipeRight, children }: SwipeHandlerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number>(0);
  const startYRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const threshold = 50; // Minimum distance for swipe
    const restraint = 100; // Maximum distance in the other direction

    // Touch events
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      startXRef.current = touch.clientX;
      startYRef.current = touch.clientY;
      isDraggingRef.current = true;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isDraggingRef.current) return;
      
      const touch = e.changedTouches[0];
      const distX = touch.clientX - startXRef.current;
      const distY = touch.clientY - startYRef.current;
      
      isDraggingRef.current = false;

      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        if (distX > 0) {
          onSwipeRight();
        } else {
          onSwipeLeft();
        }
      }
    };

    // Mouse events for desktop
    const handleMouseDown = (e: MouseEvent) => {
      startXRef.current = e.clientX;
      startYRef.current = e.clientY;
      isDraggingRef.current = true;
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      
      const distX = e.clientX - startXRef.current;
      const distY = e.clientY - startYRef.current;
      
      isDraggingRef.current = false;

      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        if (distX > 0) {
          onSwipeRight();
        } else {
          onSwipeLeft();
        }
      }
    };

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        onSwipeLeft();
      } else if (e.key === 'ArrowLeft') {
        onSwipeRight();
      }
    };

    // Add event listeners
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onSwipeLeft, onSwipeRight]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full cursor-pointer select-none"
      style={{ touchAction: 'pan-y' }}
    >
      {children}
    </div>
  );
};

export default SwipeHandler;