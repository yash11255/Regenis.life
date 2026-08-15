"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface RouteTransitionProps {
  children: React.ReactNode;
}

export default function RouteTransition({ children }: RouteTransitionProps) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <div key={pathname} className="route-transition" data-route={pathname}>
      {children}
    </div>
  );
}
