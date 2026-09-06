import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { IkatEdge } from "./IkatEdge";

type WarpBandProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Renders the shared feathered bottom edge (design.md D4). Default true. */
  edge?: boolean;
};

// Full-bleed band shell shared by every Macana band (design.md D3/D4/D8):
// pine ground, the warp-thread texture layer, and a slot for band content on
// `.container-1218` so every band sits on the same grid the page and the
// mark share. Server component — no `"use client"`, no interactivity.
export function WarpBand({ id, children, className, edge = true }: WarpBandProps) {
  return (
    <section
      id={id}
      className={cn(
        "macana-band relative w-full bg-macana-ground text-macana-cotton",
        className
      )}
    >
      <IkatEdge />
      {/* Decorative warp threads; a sibling of the filtered edge below, per
          D4's hard rule (filter and animation never share an element). */}
      <div className="macana-band__warp" aria-hidden="true" />
      <div className="container-1218 relative mx-auto py-warp-3">
        {children}
      </div>
      {edge && <div className="ikat-edge" aria-hidden="true" />}
    </section>
  );
}

export default WarpBand;
