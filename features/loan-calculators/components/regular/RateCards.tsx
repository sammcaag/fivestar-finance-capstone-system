"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { RateCardsProps } from "../../types/types-regular";

export default function RateCards({
  rates,
  selectedCard,
  onCardClick,
}: RateCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Loop through the rates and display them in a card */}
      {rates.map((rate) => (
        <Card
          key={rate.id}
          className={`cursor-pointer transition-colors ${
            selectedCard === rate.id
              ? "bg-blue-50 border-blue-300 ring-2 ring-blue-300 shadow-md"
              : "hover:bg-gray-50"
          }`}
          onClick={() => onCardClick(rate.id)}
        >
          <CardHeader className="text-center">
            <CardTitle
              className={`text-base font-medium
              ${selectedCard === rate.id && "text-[#202B61]"}`}
            >
              {rate.title}
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
