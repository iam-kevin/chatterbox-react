import { useRef } from 'react';

export const useConstant = function <T>(fn: () => T) {
  const ref = useRef(fn());

  return ref.current;
};
