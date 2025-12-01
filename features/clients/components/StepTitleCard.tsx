"use client";
import { motion, Variants } from "framer-motion";

type StepTitleCardProps = {
  variants: Variants;
  title: string;
  description: string;
};

export function StepTitleCard({ variants, title, description }: StepTitleCardProps) {
  return (
    <motion.div variants={variants} className="bg-card rounded-lg shadow-lg border p-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}
