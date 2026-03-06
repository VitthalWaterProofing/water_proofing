import type { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-[1360px] mx-auto px-6">
      {children}
    </div>
  );
}