"use client";

import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { User, Phone, Heart, Map } from "lucide-react";
import { StepTitleCard } from "../StepTitleCard";
import useClientAnimation from "../../hooks/use-client-animation";
import { SectionCard } from "../SectionCard";

const fieldSkeleton = (
  <div className="flex flex-col gap-2 min-h-[80px]">
    <Skeleton className="h-4 w-32" /> {/* Label */}
    <Skeleton className="h-10 w-full rounded-md" /> {/* Input / Select */}
  </div>
);

const ClientGeneralInformationSkeleton = ({ title = "Client" }: { title?: string }) => {
  const { containerVariants, itemVariants } = useClientAnimation();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* 👤 Step Title Card */}
      <StepTitleCard
        variants={itemVariants}
        title={`${title} General Information`}
        description={`Loading ${title.toLowerCase()} details...`}
      />

      {/* BASIC INFORMATION */}
      <SectionCard variants={itemVariants} icon={User} title="Basic Information">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {fieldSkeleton}
          {fieldSkeleton}
          {fieldSkeleton}
          {fieldSkeleton}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {fieldSkeleton}
          {fieldSkeleton}
        </div>
      </SectionCard>

      {/* ADDRESS INFORMATION */}
      <SectionCard variants={itemVariants} icon={Map} title="Address Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {fieldSkeleton}
          {fieldSkeleton}
          {fieldSkeleton}
          {fieldSkeleton}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {fieldSkeleton}
          {fieldSkeleton}
          {fieldSkeleton}
        </div>
      </SectionCard>

      {/* CONTACT INFORMATION */}
      <SectionCard variants={itemVariants} icon={Phone} title="Contact Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fieldSkeleton}
          {fieldSkeleton}
        </div>
      </SectionCard>

      {/* ADDITIONAL INFORMATION */}
      <SectionCard variants={itemVariants} icon={Heart} title="Additional Information">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fieldSkeleton}
          {fieldSkeleton}
          {fieldSkeleton}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {fieldSkeleton}
          {fieldSkeleton}
        </div>
      </SectionCard>
    </motion.div>
  );
};

export default ClientGeneralInformationSkeleton;
