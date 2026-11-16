export type FlowNodeType = 'terminal' | 'process' | 'decision' | 'data' | 'external';
export type FlowSide = 'top' | 'bottom' | 'left' | 'right';
export type Point = [number, number];

export interface FlowNode {
  id: string;
  type: FlowNodeType;
  label: string;
  /** Center coordinates */
  x: number;
  y: number;
  w?: number;
  h?: number;
}

export interface FlowEdge {
  from: string;
  fromSide: FlowSide;
  to: string;
  toSide: FlowSide;
  via?: Point[];
  label?: string;
  labelAt?: Point;
}

export interface FlowchartDef {
  width: number;
  height: number;
  nodes: FlowNode[];
  edges: FlowEdge[];
}