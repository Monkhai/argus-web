import React from "react";
interface Props {
  children: React.ReactNode;
}
export default function View({ children }: Props) {
  return <div className="h-full w-full overflow-y-auto py-6">{children}</div>;
}
