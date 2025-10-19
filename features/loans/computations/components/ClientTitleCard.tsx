import React from "react";
import { motion, Variants } from "framer-motion";

type ClientTitleCardProps = {
  variants: Variants;
  title: string;
  description: string;
};

const ClientTitleCard = ({
  variants,
  title,
  description,
}: ClientTitleCardProps) => {
  return (
    <motion.div
      className="mb-8 mt-6 relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-white shadow-lg"
      variants={variants}
    >
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>

      <div className="relative z-10">
        <h3 className="text-3xl font-bold tracking-tight">{title}</h3>
        <p className="text-blue-100 mt-2">{description}</p>
      </div>
    </motion.div>
  );
};

export default ClientTitleCard;
