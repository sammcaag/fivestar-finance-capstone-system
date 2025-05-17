import { Separator } from "@/components/ui/separator";
import React from "react";
import { ResultOutlineProps } from "../../types/types-extension";

const ResultOutline = ({
  title,
  value,
  textColorClass = "text-[#202B61]",
  isOutline = true,
}: ResultOutlineProps) => {
  return (
    <>
      <div className="space-y-2">
        <h4 className="font-medium text-base">{title}</h4>
        <p className={`font-semibold text-lg ${textColorClass}`}>{value}</p>
      </div>
      {isOutline && <Separator className="my-3" />}
    </>
  );
};

export default ResultOutline;
