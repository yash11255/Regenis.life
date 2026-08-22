"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface RouteTransitionProps {
  children: React.ReactNode;
}

export default function RouteTransition({ children }: RouteTransitionProps) {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash.slice(1);

    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    const targetId = decodeURIComponent(hash);
    let frame = 0;
    let retry: number | undefined;

    const scrollToHash = () => {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "auto", block: "start" });
      }
    };

    // Wait until the destination page has mounted before resolving the hash.
    frame = window.requestAnimationFrame(() => {
      scrollToHash();
      retry = window.setTimeout(scrollToHash, 100);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      if (retry !== undefined) window.clearTimeout(retry);
    };
  }, [pathname]);

  return (
    <div key={pathname} className="route-transition" data-route={pathname}>
      {children}
    </div>
  );
}
