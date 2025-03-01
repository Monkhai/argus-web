import { useTheme } from "next-themes";
import React from "react";

export default function XLogo() {
  const { systemTheme } = useTheme();
  return (
    <div className="flex h-4 w-4 items-center justify-center">
      <svg
        className="h-full w-full"
        viewBox="0 0 1200 1227"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
          fill={systemTheme === "dark" ? "white" : "black"}
        />
      </svg>
    </div>
  );
}
