"use client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface CountUpProps {
  end: number;
  start?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export function CountUp({
  end,
  start = 0,
  duration = 1.5,
  prefix = "",
  suffix = "",
  decimals = 0,
}: CountUpProps) {
  const [count, setCount] = useState(start);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const currentCount = progress * (end - start) + start;

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrame);
  }, [start, end, duration, inView]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      {suffix}
    </span>
  );
}
