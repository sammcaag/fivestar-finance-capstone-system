"use client";
import { motion } from "framer-motion";
import type { RateCardsProps } from "../../types/types-regular";
import { CheckCircle2 } from "lucide-react";

export default function RateCards({
  rates,
  selectedCard,
  onCardClick,
}: RateCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {rates.map((rate, index) => (
        <motion.div
          key={rate.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              delay: index * 0.1,
              duration: 0.4,
            },
          }}
          whileHover={{ y: -5 }}
          className={`
            relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300
            ${
              selectedCard === rate.id
                ? "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-2 border-blue-400 dark:border-blue-500 shadow-lg"
                : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800 shadow-sm hover:shadow-md"
            }
          `}
          onClick={() => onCardClick(rate.id)}
        >
          {selectedCard === rate.id && (
            <div className="absolute top-3 right-3">
              <CheckCircle2 className="h-5 w-5 text-blue-500" />
            </div>
          )}

          <div className="p-6 flex flex-col items-center justify-center min-h-[120px]">
            <h3
              className={`text-xl font-semibold mb-2 text-center ${
                selectedCard === rate.id
                  ? "text-blue-700 dark:text-blue-400"
                  : "text-gray-800 dark:text-gray-200"
              }`}
            >
              {rate.title}
            </h3>

            <p
              className={`text-sm text-center ${
                selectedCard === rate.id
                  ? "text-blue-600 dark:text-blue-300"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {rate.id === "1" && "Standard rate for regular clients"}
              {rate.id === "2" && "Discounted rate for preferred clients"}
              {rate.id === "3" && "Premium rate for VIP clients"}
            </p>

            {selectedCard === rate.id && (
              <motion.div
                className="w-16 h-1 bg-blue-500 rounded-full mt-4"
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
