import { useEffect, useState } from "react";

export default function useWindowSize() {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [height, setHeight] = useState<number>(window.innerHeight);

  useEffect(function () {
    const handle = function () {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
    window.addEventListener("resize", handle);
    
    return function () {
      window.removeEventListener("resize", handle);
    }
  }, []);

  return [width, height];
}