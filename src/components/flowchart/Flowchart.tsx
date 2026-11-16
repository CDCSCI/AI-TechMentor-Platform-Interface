import React from 'react';
import type { FlowchartDef, FlowNode, FlowNodeType, FlowSide, Point } from '../../types/flowchart';

const SIZE: Record<FlowNodeType, [number, number]> = {
  terminal: [190, 46],
  process: [210, 54],
  decision: [180, 92],
  data: [210, 62],
  external: [210, 54]
};

const INK = '#141414';

function dims(n: FlowNode): [number, number] {
  return [n.w ?? SIZE[n.type][0], n.h ?? SIZE[n.type][1]];
}

function anchor(n: FlowNode, side: FlowSide): Point {
  const [w, h] = dims(n);
  if (side === 'top') return [n.x, n.y - h / 2];
  if (side === 'bottom') return [n.x, n.y + h / 2];
  if (side === 'left') return [n.x - w / 2, n.y];
  return [n.x + w / 2, n.y];
}

const isVertical = (s: FlowSide) => s === 'top' || s === 'bottom';

function route(s: Point, sSide: FlowSide, t: Point, tSide: FlowSide, via?: Point[]): Point[] {
  if (via) return [s, ...via, t];
  if (isVertical(sSide) && isVertical(tSide)) {
    if (s[0] === t[0]) return [s, t];
    const my = (s[1] + t[1]) / 2;
    return [s, [s[0], my], [t[0], my], t];
  }
  if (!isVertical(sSide) && !isVertical(tSide)) {
    if (s[1] === t[1]) return [s, t];
    const mx = (s[0] + t[0]) / 2;
    return [s, [mx, s[1]], [mx, t[1]], t];
  }
  if (!isVertical(sSide)) return [s, [t[0], s[1]], t];
  return [s, [s[0], t[1]], t];
}

export function Flowchart({ chart, title }: {chart: FlowchartDef;title: string;}) {
  const nodes = new Map(chart.nodes.map((n) => [n.id, n]));
  const markerId = `arrow-${title.replace(/\W+/g, '-').toLowerCase()}`;

  return (
    <svg viewBox={`0 0 ${chart.width} ${chart.height}`} width="100%" role="img" aria-label={title} className="h-auto">
      <defs>
        <marker id={markerId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 10 5 0 10Z" fill={INK} />
        </marker>
      </defs>

      {chart.edges.map((e, i) => {
        const a = nodes.get(e.from);
        const b = nodes.get(e.to);
        if (!a || !b) return null;
        const pts = route(anchor(a, e.fromSide), e.fromSide, anchor(b, e.toSide), e.toSide, e.via);
        return (
          <g key={i}>
            <polyline
              points={pts.map((p) => p.join(',')).join(' ')}
              fill="none"
              stroke={INK}
              strokeWidth={1.25}
              strokeLinejoin="round"
              markerEnd={`url(#${markerId})`} />
            
            {e.label && e.labelAt &&
            <text x={e.labelAt[0]} y={e.labelAt[1]} fontSize="11" fontWeight={600} fill="#5c5b57" fontFamily="Inter, sans-serif">
                {e.label}
              </text>
            }
          </g>);

      })}

      {chart.nodes.map((n) =>
      <NodeShape key={n.id} node={n} />
      )}
    </svg>);

}

function NodeShape({ node }: {node: FlowNode;}) {
  const [w, h] = dims(node);
  const x0 = node.x - w / 2;
  const y0 = node.y - h / 2;
  const e = 8;

  let shape: React.ReactNode;
  let textBox = { x: x0 + 8, y: y0, w: w - 16, h };
  let textClass = 'text-ink';

  switch (node.type) {
    case 'terminal':
      shape = <rect x={x0} y={y0} width={w} height={h} rx={h / 2} fill="#121212" />;
      textClass = 'text-white font-semibold';
      break;
    case 'decision':
      shape =
      <polygon
        points={`${node.x},${y0} ${x0 + w},${node.y} ${node.x},${y0 + h} ${x0},${node.y}`}
        fill="#efede7"
        stroke={INK}
        strokeWidth={1.25} />;


      textBox = { x: node.x - w * 0.32, y: y0, w: w * 0.64, h };
      textClass = 'text-ink font-semibold';
      break;
    case 'data':
      shape =
      <>
          <path
          d={`M${x0} ${y0 + e} V${y0 + h - e} A${w / 2} ${e} 0 0 0 ${x0 + w} ${y0 + h - e} V${y0 + e}`}
          fill="#e4e2db"
          stroke={INK}
          strokeWidth={1.25} />
        
          <ellipse cx={node.x} cy={y0 + e} rx={w / 2} ry={e} fill="#e4e2db" stroke={INK} strokeWidth={1.25} />
        </>;

      textBox = { x: x0 + 8, y: y0 + e * 2, w: w - 16, h: h - e * 2 };
      break;
    case 'external':
      shape = <rect x={x0} y={y0} width={w} height={h} rx={6} fill="#faf9f6" stroke={INK} strokeWidth={1.25} strokeDasharray="5 4" />;
      break;
    default:
      shape = <rect x={x0} y={y0} width={w} height={h} rx={6} fill="#faf9f6" stroke={INK} strokeWidth={1.25} />;
  }

  return (
    <g>
      {shape}
      <foreignObject x={textBox.x} y={textBox.y} width={textBox.w} height={textBox.h}>
        <div className={`flex h-full w-full items-center justify-center text-center text-[12px] leading-tight ${textClass}`}>
          {node.label}
        </div>
      </foreignObject>
    </g>);

}

export function FlowLegend() {
  const items: {label: string;shape: React.ReactNode;}[] = [
  { label: 'Start / end', shape: <rect x="2" y="5" width="32" height="14" rx="7" fill="#121212" /> },
  { label: 'Process', shape: <rect x="2" y="4" width="32" height="16" rx="3" fill="#faf9f6" stroke={INK} /> },
  { label: 'Decision', shape: <polygon points="18,2 34,12 18,22 2,12" fill="#efede7" stroke={INK} /> },
  {
    label: 'Data store',
    shape:
    <>
          <path d="M3 6 V18 A15 4 0 0 0 33 18 V6" fill="#e4e2db" stroke={INK} />
          <ellipse cx="18" cy="6" rx="15" ry="4" fill="#e4e2db" stroke={INK} />
        </>

  },
  { label: 'External service', shape: <rect x="2" y="4" width="32" height="16" rx="3" fill="#faf9f6" stroke={INK} strokeDasharray="4 3" /> }];

  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink-muted" aria-label="Flowchart legend">
      {items.map((i) =>
      <li key={i.label} className="flex items-center gap-2">
          <svg width="36" height="24" aria-hidden="true">
            {i.shape}
          </svg>
          {i.label}
        </li>
      )}
    </ul>);

}