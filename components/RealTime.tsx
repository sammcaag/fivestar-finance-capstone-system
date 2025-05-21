import { Clock } from "lucide-react";
import React, { useEffect, useState } from "react";

const RealTime = () => {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Clock className="h-4 w-4" />
      <span>
        {currentTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}
      </span>
    </>
  );
};

export default RealTime;
