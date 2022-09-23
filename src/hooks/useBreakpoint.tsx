import { useEffect, useState } from "react";

function useBreakpoint(width: number | string) {
  const [wasReached, setWasReached] = useState(false);

  useEffect(() => {
    const verifyBreakpoint = () =>
      setWasReached(
        window.innerWidth >= Number(String(width).replace(/[^0-9]/g, ""))
      );

    verifyBreakpoint();

    window.addEventListener("resize", verifyBreakpoint);

    return () => {
      window.removeEventListener("resize", verifyBreakpoint);
    };
  }, [width]);

  return wasReached;
}

export default useBreakpoint;
