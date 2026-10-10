import React, { useState } from 'react';
import { RadarAxis } from '../types';

interface RadarChartProps {
  axes: RadarAxis[];
}

export const RadarChart: React.FC<RadarChartProps> = ({ axes }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const cx = 210;
  const cy = 190;
  const maxR = 140;

  // 5 vertices calculate coordinates based on score (0..100)
  const getCoordinates = (scores: number[]) => {
    return scores.map((score, i) => {
      const r = (score / 100) * maxR;
      switch (i) {
        case 0: // Top
          return { x: cx, y: cy - r };
        case 1: // Right-top
          return { x: cx + r * 0.9511, y: cy - r * 0.309 };
        case 2: // Right-bottom
          return { x: cx + r * 0.5878, y: cy + r * 0.809 };
        case 3: // Left-bottom
          return { x: cx - r * 0.5878, y: cy + r * 0.809 };
        case 4: // Left-top
          return { x: cx - r * 0.9511, y: cy - r * 0.309 };
        default:
          return { x: cx, y: cy };
      }
    });
  };

  const candidateScores = axes.map((a) => a.score);
  const benchmarkScores = axes.map((a) => a.benchmark);

  const candidateCoords = getCoordinates(candidateScores);
  const benchmarkCoords = getCoordinates(benchmarkScores);

  const candidatePoints = candidateCoords.map((c) => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ');
  const benchmarkPoints = benchmarkCoords.map((c) => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ');

  // Radial grid levels: 20%, 40%, 60%, 80%, 100%
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];

  const getLabelAnchor = (i: number) => {
    if (i === 0) return 'middle';
    if (i === 1) return 'start';
    if (i === 2) return 'middle';
    if (i === 3) return 'middle';
    return 'end';
  };

  const getLabelPos = (i: number) => {
    switch (i) {
      case 0:
        return { x: cx, y: 38 };
      case 1:
        return { x: 352, y: 148 };
      case 2:
        return { x: 296, y: 322 };
      case 3:
        return { x: 124, y: 322 };
      case 4:
        return { x: 68, y: 148 };
      default:
        return { x: cx, y: cy };
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      <svg
        className="w-full max-w-[390px] h-auto overflow-visible select-none drop-shadow-xs"
        viewBox="0 0 420 380"
      >
        {/* Concentric Radial Pentagons */}
        {gridLevels.map((lvl, index) => {
          const r = lvl * maxR;
          const p = [
            `${cx},${cy - r}`,
            `${cx + r * 0.9511},${cy - r * 0.309}`,
            `${cx + r * 0.5878},${cy + r * 0.809}`,
            `${cx - r * 0.5878},${cy + r * 0.809}`,
            `${cx - r * 0.9511},${cy - r * 0.309}`
          ].join(' ');
          const isOuter = index === gridLevels.length - 1;

          return (
            <polygon
              key={lvl}
              fill="none"
              points={p}
              stroke="currentColor"
              className={isOuter ? 'text-slate-300 dark:text-slate-700' : 'text-slate-200 dark:text-slate-800'}
              strokeWidth={isOuter ? 1.5 : 1}
            />
          );
        })}

        {/* Axis Spokes */}
        {[
          { x2: cx, y2: cy - maxR },
          { x2: cx + maxR * 0.9511, y2: cy - maxR * 0.309 },
          { x2: cx + maxR * 0.5878, y2: cy + maxR * 0.809 },
          { x2: cx - maxR * 0.5878, y2: cy + maxR * 0.809 },
          { x2: cx - maxR * 0.9511, y2: cy - maxR * 0.309 }
        ].map((line, i) => (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={line.x2}
            y2={line.y2}
            stroke="currentColor"
            className="text-slate-200 dark:text-slate-800"
            strokeWidth={1.2}
          />
        ))}

        {/* Benchmark Polygon (Dashed, 75%) */}
        <polygon
          fill="none"
          points={benchmarkPoints}
          stroke="#94A3B8"
          strokeDasharray="4,4"
          strokeWidth="1.8"
        />

        {/* Candidate Polygon (Primary Blue with Soft Translucent Fill) */}
        <polygon
          points={candidatePoints}
          fill="#2563EB"
          fillOpacity="0.22"
          stroke="#2563EB"
          strokeWidth="2.5"
          className="transition-all duration-700 ease-out"
        />

        {/* Candidate Vertices */}
        {candidateCoords.map((coord, i) => {
          const isHovered = hoveredIndex === i;
          return (
            <g key={i}>
              <circle
                cx={coord.x}
                cy={coord.y}
                r={isHovered ? 6.5 : 4.5}
                fill="#2563EB"
                stroke="#FFFFFF"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            </g>
          );
        })}

        {/* Axis Vertex Labels */}
        {axes.map((axis, i) => {
          const pos = getLabelPos(i);
          const anchor = getLabelAnchor(i);
          const isGap = axis.score < axis.benchmark;

          return (
            <text
              key={axis.key}
              x={pos.x}
              y={pos.y}
              textAnchor={anchor}
              className={`font-label-caps text-[10.5px] font-bold uppercase transition-colors cursor-pointer select-none ${
                isGap ? 'fill-red-600 dark:fill-red-400' : 'fill-slate-800 dark:fill-slate-200'
              }`}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {axis.label} ({axis.score})
            </text>
          );
        })}
      </svg>

      {/* Floating Interactive Tooltip */}
      {hoveredIndex !== null && axes[hoveredIndex] && (
        <div className="absolute -bottom-2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg shadow-xl border border-slate-700 max-w-xs text-center z-20 animate-in fade-in zoom-in-95 duration-150">
          <p className="font-bold mb-0.5">
            {axes[hoveredIndex].label}: {axes[hoveredIndex].score} / 100
          </p>
          <p className="text-slate-300 text-[11px] leading-snug">
            {axes[hoveredIndex].description}
          </p>
        </div>
      )}
    </div>
  );
};
