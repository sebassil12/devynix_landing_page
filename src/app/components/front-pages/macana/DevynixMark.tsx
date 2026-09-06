import { MARK_PITCH, MARK_STROKE } from "./warp";

// 14 lattice steps per side: 14 * MARK_PITCH(6) = 84, the mark's viewBox.
const GRID = 14;
const SIZE = MARK_PITCH * GRID;
const MARGIN = 1; // grid units kept clear of the frame stroke
const CELL = 2; // grid units per weave cell
const CELLS = (GRID - MARGIN * 2) / CELL; // 6 weave cells per side

type Thread = [x1: number, y1: number, x2: number, y2: number];

// One diagonal thread per weave cell, alternating direction in a checkerboard
// so every cell crosses its neighbors — the same interlace discipline the
// page warp bands scale up to (design.md D1/D2), authored here as JSX paths
// rather than traced from the raster reference.
const threads: Thread[] = [];
for (let row = 0; row < CELLS; row++) {
  for (let col = 0; col < CELLS; col++) {
    const x0 = (MARGIN + col * CELL) * MARK_PITCH;
    const y0 = (MARGIN + row * CELL) * MARK_PITCH;
    const x1 = x0 + CELL * MARK_PITCH;
    const y1 = y0 + CELL * MARK_PITCH;
    threads.push((row + col) % 2 === 0 ? [x0, y0, x1, y1] : [x1, y0, x0, y1]);
  }
}

type DevynixMarkProps = {
  className?: string;
};

export function DevynixMark({ className }: DevynixMarkProps) {
  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className={className}
      role="img"
      aria-label="Devynix"
    >
      <rect
        x={MARK_STROKE / 2}
        y={MARK_STROKE / 2}
        width={SIZE - MARK_STROKE}
        height={SIZE - MARK_STROKE}
        fill="none"
        stroke="#FFBD59"
        strokeWidth={MARK_STROKE}
      />
      {threads.map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#FFBD59"
          strokeWidth={MARK_STROKE}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

export default DevynixMark;
