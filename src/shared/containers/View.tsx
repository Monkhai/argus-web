import React from "react";
interface Props {
  children: React.ReactNode;
}
export default function View({ children }: Props) {
  return (
    <div className="h-full w-full overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
