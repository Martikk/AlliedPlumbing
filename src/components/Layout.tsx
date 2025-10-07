import React from "react";
import { EmergencyBar } from "./EmergencyBar";

export function Layout({ children }: { children: React.ReactNode }) {
  // высота бара ~32px → безопаснее дать 40px
  return (
    <div className="min-h-screen text-neutral-800 pt-10">
      <EmergencyBar />
      <main className="px-4">{children}</main>
    </div>
  );
}