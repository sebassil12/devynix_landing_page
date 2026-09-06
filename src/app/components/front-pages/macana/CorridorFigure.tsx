import type { Dictionary } from "@/i18n/dictionaries";
import { PAGE_WIDTH, WARP } from "./warp";
import type { Corridor, SpanStatus } from "./corridor";

type CorridorFigureProps = {
  data: Corridor;
  copy: Dictionary["home"]["urdimbre"];
};

// Grid-locked span layout (design.md D3): span width one warp unit, pitch two
// warp units, first span at three warp units from the left edge. With 12
// spans this covers exactly 966px, leaving a 126px margin on each side of the
// 1218px content width — every figure below is an integer multiple of WARP.
const SPAN_PITCH = WARP * 2;
const FIRST_SPAN_X = WARP * 3;
const FIGURE_HEIGHT = WARP * 3;

const BAR_HEIGHT: Record<SpanStatus, number> = {
  urgent: WARP * 3,
  action: WARP * 2,
  stable: WARP,
};

// Graphics-only palette use: WCAG 1.4.11 (non-text contrast, 3:1) applies
// here, not the 4.5:1 text threshold — design.md D9 clears `#D14338` for
// graphics at any size on `#0E2422` (3.5:1).
const BAR_FILL: Record<SpanStatus, string> = {
  urgent: "#D14338",
  action: "#FFBD59",
  stable: "#F0EBE0",
};

/**
 * Band ① URDIMBRE's focal proof: the 12 real Cuenca corridor spans drawn as
 * generated SVG marks, plus an always-rendered `<table>` carrying the same
 * literal so the two can never disagree (corridor-figure spec, "Server-
 * Rendered No-JS Fallback"). Both are unconditional server output — neither
 * is behind a JS mount or a `<noscript>`.
 */
export function CorridorFigure({ data, copy }: CorridorFigureProps) {
  return (
    <div className="corridor-figure">
      <svg
        viewBox={`0 0 ${PAGE_WIDTH} ${FIGURE_HEIGHT}`}
        className="h-auto w-full"
        aria-hidden="true"
        focusable="false"
      >
        {data.spans.map((span, index) => {
          const height = BAR_HEIGHT[span.status];
          return (
            <rect
              key={span.id}
              x={FIRST_SPAN_X + index * SPAN_PITCH}
              y={FIGURE_HEIGHT - height}
              width={WARP}
              height={height}
              fill={BAR_FILL[span.status]}
            />
          );
        })}
      </svg>
      <table className="sr-only">
        <caption>{copy.table.caption}</caption>
        <thead>
          <tr>
            <th scope="col">{copy.table.colSpan}</th>
            <th scope="col">{copy.table.colStatus}</th>
          </tr>
        </thead>
        <tbody>
          {data.spans.map((span) => (
            <tr key={span.id}>
              <td>{span.id}</td>
              <td>{copy.status[span.status]}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>
              {copy.table.colRisk}: {data.riskIndex}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default CorridorFigure;
