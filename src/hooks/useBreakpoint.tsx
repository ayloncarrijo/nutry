import { useEffect, useState } from "react";

function useBreakpoint(width: number | string) {
  const [wasReached, setWasReached] = useState(false);

  useEffect(() => {
    const checkBreakpoint = () =>
      setWasReached(
        window.innerWidth >= Number(String(width).replace(/[^0-9]/g, ""))
      );

    checkBreakpoint();

    window.addEventListener("resize", checkBreakpoint);

    return () => {
      window.removeEventListener("resize", checkBreakpoint);
    };
  }, [width]);

  return wasReached;
}

export default useBreakpoint;
