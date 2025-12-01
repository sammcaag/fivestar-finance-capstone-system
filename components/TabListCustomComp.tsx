import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { AnimatedBackground } from "./motion-primitives/animated-background";
import clsx from "clsx";

export default function TabListCustomComp({
  tabs,
  notFullWidth = false,
}: {
  tabs: { value: string; label: string }[];
  notFullWidth?: boolean;
}) {
  return (
    <TabsList
      className={clsx("tabs-container", tabs.length < 4 ? "w-1/2" : notFullWidth ? "" : "w-full")}
    >
      <AnimatedBackground
        className="bg-primary-hover"
        transition={{
          type: "spring",
          bounce: 0.2,
          duration: 0.6,
        }}
        enableHover
      >
        {tabs.map((tab, index) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            data-id={index}
            className="tabs-trigger-style z-5"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </AnimatedBackground>
    </TabsList>
  );
}
