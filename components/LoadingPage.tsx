"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FileCheck, Heart, Loader2 } from "lucide-react";

export default function Loading({
  message = "Please wait, fetching your data...",
  subtitle = "Retrieving information for AFP retirees and beneficiaries",
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-blue-300">
        <CardContent className="pt-12 pb-12 px-8">
          <div className="flex flex-col items-center space-y-8">
            {/* Heart with Philippine Peso Symbol */}
            <div className="relative">
              {/* Outer glow rings */}
              <div className="absolute inset-0 bg-blue-400 rounded-full blur-2xl opacity-30 animate-pulse scale-150"></div>
              <div
                className="absolute inset-0 bg-red-300 rounded-full blur-xl opacity-20 animate-pulse scale-125"
                style={{ animationDelay: "0.5s" }}
              ></div>

              {/* Heart Design with Peso */}
              <div className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-blue-800 rounded-2xl p-10 shadow-2xl border-4 border-blue-300/30">
                {/* Main Heart Icon */}
                <div className="relative">
                  <Heart className="w-20 h-20 text-red-400" strokeWidth={2.5} fill="currentColor" />
                </div>

                {/* Verification checkmark badge */}
                <div className="absolute -top-2 -right-2 bg-indigo-600 rounded-full p-2 shadow-lg border-2 border-white">
                  <FileCheck className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>

                {/* Corner accents for design */}
                <div className="absolute top-1 left-1 w-4 h-4 border-l-2 border-t-2 border-blue-200"></div>
                <div className="absolute top-1 right-1 w-4 h-4 border-r-2 border-t-2 border-blue-200"></div>
                <div className="absolute bottom-1 left-1 w-4 h-4 border-l-2 border-b-2 border-blue-200"></div>
                <div className="absolute bottom-1 right-1 w-4 h-4 border-r-2 border-b-2 border-blue-200"></div>
              </div>

              {/* Rotating Spinner Ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-40 h-40 text-blue-500 animate-spin" strokeWidth={1.5} />
              </div>
            </div>

            {/* AFP Branding */}
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-1 w-16 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-800 tracking-wide">
                  AFP
                </h2>
                <div className="h-1 w-16 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
              </div>
              <p className="text-sm font-semibold text-blue-700 uppercase tracking-wider">
                Armed Forces of the Philippines
              </p>
              <p className="text-xs text-gray-600">Retirement & Benefits Information System</p>
            </div>

            {/* Loading Messages */}
            <div className="text-center space-y-3 max-w-lg">
              <h3 className="text-2xl font-bold text-gray-800">{message}</h3>
              <p className="text-base text-gray-600 leading-relaxed">{subtitle}</p>
            </div>

            {/* Enhanced Progress Indicator */}
            <div className="w-full max-w-md space-y-2">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-500 rounded-full animate-loading-bar shadow-lg"></div>
              </div>
              <p className="text-xs text-center text-gray-500">Processing your request...</p>
            </div>

            {/* Service Indicators */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex flex-col items-center gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse shadow-lg"></div>
                <span className="text-xs text-gray-600 font-medium">Retirees</span>
              </div>
              <div className="h-8 w-px bg-gray-300"></div>
              <div className="flex flex-col items-center gap-2">
                <div
                  className="w-3 h-3 bg-indigo-600 rounded-full animate-pulse shadow-lg"
                  style={{ animationDelay: "0.3s" }}
                ></div>
                <span className="text-xs text-gray-600 font-medium">Beneficiaries</span>
              </div>
              <div className="h-8 w-px bg-gray-300"></div>
              <div className="flex flex-col items-center gap-2">
                <div
                  className="w-3 h-3 bg-blue-600 rounded-full animate-pulse shadow-lg"
                  style={{ animationDelay: "0.6s" }}
                ></div>
                <span className="text-xs text-gray-600 font-medium">Records</span>
              </div>
            </div>

            {/* Service Message */}
            <div className="text-center pt-2 border-t border-blue-200 w-full max-w-md">
              <p className="text-xs text-gray-500 italic mt-4">
                {`"Serving those who served the nation with care and dedication"`}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes loading-bar {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
