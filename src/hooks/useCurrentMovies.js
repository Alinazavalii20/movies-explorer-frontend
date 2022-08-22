import { useEffect, useState } from "react";

export const useCurrentWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    let timeoutId = null;
  
    const resizeListener = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setWidth(window.innerWidth), 150);
    };
      
    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    }
    }, []);

    return width;
}

export const getIntallMovies = (width) => {
  if (width >= 1280) {
      return 12;
  }

  if (width >= 768) {
      return 8;
  }

  return 5;
}

export const  getLoadMovies = (width) => {
  if (width >= 1280) {
      return 3
  }

  return 2
};