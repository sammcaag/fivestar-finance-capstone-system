"use client";

import { motion } from "framer-motion";
import { User, Phone, Heart, Map } from "lucide-react";

const ClientGeneralInformationSkeleton = () => {
  const skeletonBlock = "h-10 bg-gray-300 rounded animate-pulse";

  return (
    <motion.div className="space-y-6">
      {/* Step Title */}
      <div className="h-12 w-3/4 bg-gray-300 rounded animate-pulse" />

      {/* Basic Information */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <User className="w-6 h-6 text-gray-400" />
          <div className="h-6 w-1/3 bg-gray-300 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className={skeletonBlock} />
          <div className={skeletonBlock} />
          <div className={skeletonBlock} />
          <div className={skeletonBlock} />
        </div>
      </div>

      {/* Address Information */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Map className="w-6 h-6 text-gray-400" />
          <div className="h-6 w-1/3 bg-gray-300 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className={skeletonBlock} />
          <div className={skeletonBlock} />
          <div className={skeletonBlock} />
          <div className={skeletonBlock} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className={skeletonBlock} />
          <div className={skeletonBlock} />
          <div className={skeletonBlock} />
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Phone className="w-6 h-6 text-gray-400" />
          <div className="h-6 w-1/3 bg-gray-300 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className={skeletonBlock} />
          <div className={skeletonBlock} />
        </div>
      </div>

      {/* Additional Information */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Heart className="w-6 h-6 text-gray-400" />
          <div className="h-6 w-1/3 bg-gray-300 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className={skeletonBlock} />
          <div className={skeletonBlock} />
          <div className={skeletonBlock} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className={skeletonBlock} />
          <div className={skeletonBlock} />
        </div>
      </div>
    </motion.div>
  );
};

export default ClientGeneralInformationSkeleton;
