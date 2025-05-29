"use client";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import type { Variants } from "framer-motion";

interface RateCardProps {
  rate: {
    id: string;
    title: string;
  };
  index: number;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const rateDescriptions: Record<string, string> = {
  "1": "Standard rate for regular clients",
  "2": "Discounted rate for preferred clients",
  "3": "Premium rate for VIP clients",
};

export function RateCard({ rate, index, isSelected, onSelect }: RateCardProps) {
  const cardVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.4,
      },
    },
    hover: { y: -5 },
  };

  const getCardStyles = () => {
    if (isSelected) {
      return "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-2 border-blue-400 dark:border-blue-500 shadow-lg";
    }
    return "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800 shadow-sm hover:shadow-md";
  };

  const getTextStyles = () => {
    if (isSelected) {
      return {
        title: "text-blue-700 dark:text-blue-400",
        description: "text-blue-600 dark:text-blue-300",
      };
    }
    return {
      title: "text-gray-800 dark:text-gray-200",
      description: "text-gray-500 dark:text-gray-400",
    };
  };

  const textStyles = getTextStyles();

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 ${getCardStyles()}`}
      onClick={() => onSelect(rate.id)}
    >
      {isSelected && (
        <div className="absolute top-3 right-3">
          <CheckCircle2 className="h-5 w-5 text-blue-500" />
        </div>
      )}

      <div className="p-6 flex flex-col items-center justify-center min-h-[120px]">
        <h3
          className={`text-xl font-semibold mb-2 text-center ${textStyles.title}`}
        >
          {rate.title}
        </h3>

        <p className={`text-sm text-center ${textStyles.description}`}>
          {rateDescriptions[rate.id]}
        </p>

        {isSelected && (
          <motion.div
            className="w-16 h-1 bg-blue-500 rounded-full mt-4"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>
    </motion.div>
  );
}
