import { useEffect, useRef } from 'react';

const useIdleTimeout = (onIdle, timeoutMinutes = 15) => {
  const timeoutId = useRef(null);

  const resetTimeout = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    // Convert minutes to milliseconds
    timeoutId.current = setTimeout(() => {
      onIdle();
    }, timeoutMinutes * 60 * 1000);
  };

  useEffect(() => {
    const events = [
      'load',
      'mousemove',
      'mousedown',
      'click',
      'scroll',
      'keypress'
    ];

    const handleEvent = () => resetTimeout();

    // Attach event listeners
    events.forEach((event) => {
      window.addEventListener(event, handleEvent);
    });

    // Initialize timeout
    resetTimeout();

    // Cleanup
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
      events.forEach((event) => {
        window.removeEventListener(event, handleEvent);
      });
    };
  }, [onIdle, timeoutMinutes]);
};

export default useIdleTimeout;
