import { SearchBar } from "@/components/forms/SearchBar";
import React, { Suspense } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col gap-6">
      <Suspense fallback={null}>
        <SearchBar />
      </Suspense>
      {children}
    </div>
  );
}
