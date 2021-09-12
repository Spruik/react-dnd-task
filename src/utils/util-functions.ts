import { useEffect, useState } from 'react';

export const useViewport = () => {
  const [state, setState] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  useEffect(() => {
    const handleWindowResize = () => {
      setState({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  });

  return { width: state.width, height: state.height };
};
