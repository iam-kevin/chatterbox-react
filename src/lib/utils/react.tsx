import React, { useRef } from 'react';

export const useConstant = function <T>(fn: () => T) {
  const ref = useRef<T>(fn());

  React.useEffect(() => {
    if (!ref.current) return;
    ref.current = fn();
  }, [fn]);

  return ref.current;
};
