import type { FlowchartDef } from '../types/flowchart';

/** Technical request-processing flow */
export const designFlow: FlowchartDef = {
  width: 760,
  height: 1300,
  nodes: [
  { id: 'd1', type: 'terminal', label: 'User submits a form', x: 300, y: 40 },
  { id: 'd2', type: 'process', label: 'Client validates input (React)', x: 300, y: 130 },
  { id: 'd3', type: 'decision', label: 'Input valid?', x: 300, y: 240 },
  { id: 'd3n', type: 'process', label: 'Show inline error message', x: 590, y: 240, w: 180 },
  { id: 'd4', type: 'decision', label: 'Needs AI?', x: 300, y: 370 },
  { id: 'd4n', type: 'process', label: 'Calculate in browser (Relocate)', x: 590, y: 370, w: 180 },
  { id: 'd5', type: 'process', label: 'API gateway verifies session', x: 300, y: 490 },
  { id: 'd6', type: 'data', label: 'Load profile from database', x: 300, y: 580 },
  { id: 'd7', type: 'process', label: 'AI orchestrator builds prompt from profile + request', x: 300, y: 675, h: 62 },
  { id: 'd8', type: 'external', label: 'Call LLM provider API', x: 300, y: 770 },
  { id: 'd9', type: 'decision', label: 'Response valid?', x: 300, y: 880 },
  { id: 'd9n', type: 'process', label: 'Retry up to 2× or return error state', x: 590, y: 880, w: 180, h: 62 },
  { id: 'd10', type: 'process', label: 'Parse & format result', x: 300, y: 990 },
  { id: 'd11', type: 'data', label: 'Save result & session history', x: 300, y: 1080 },
  { id: 'd12', type: 'process', label: 'Render result in UI', x: 300, y: 1170 },
  { id: 'd13', type: 'terminal', label: 'User reviews result', x: 300, y: 1255 }],

  edges: [
  { from: 'd1', fromSide: 'bottom', to: 'd2', toSide: 'top' },
  { from: 'd2', fromSide: 'bottom', to: 'd3', toSide: 'top' },
  { from: 'd3', fromSide: 'right', to: 'd3n', toSide: 'left', label: 'No', labelAt: [418, 230] },
  { from: 'd3n', fromSide: 'top', to: 'd2', toSide: 'right', label: 'Fix & resubmit', labelAt: [598, 172] },
  { from: 'd3', fromSide: 'bottom', to: 'd4', toSide: 'top', label: 'Yes', labelAt: [310, 302] },
  { from: 'd4', fromSide: 'right', to: 'd4n', toSide: 'left', label: 'No', labelAt: [418, 360] },
  { from: 'd4n', fromSide: 'right', to: 'd12', toSide: 'right', via: [[725, 370], [725, 1170]] },
  { from: 'd4', fromSide: 'bottom', to: 'd5', toSide: 'top', label: 'Yes', labelAt: [310, 432] },
  { from: 'd5', fromSide: 'bottom', to: 'd6', toSide: 'top' },
  { from: 'd6', fromSide: 'bottom', to: 'd7', toSide: 'top' },
  { from: 'd7', fromSide: 'bottom', to: 'd8', toSide: 'top' },
  { from: 'd8', fromSide: 'bottom', to: 'd9', toSide: 'top' },
  { from: 'd9', fromSide: 'right', to: 'd9n', toSide: 'left', label: 'No', labelAt: [418, 870] },
  { from: 'd9n', fromSide: 'top', to: 'd8', toSide: 'right', label: 'Retry', labelAt: [598, 812] },
  { from: 'd9', fromSide: 'bottom', to: 'd10', toSide: 'top', label: 'Yes', labelAt: [310, 942] },
  { from: 'd10', fromSide: 'bottom', to: 'd11', toSide: 'top' },
  { from: 'd11', fromSide: 'bottom', to: 'd12', toSide: 'top' },
  { from: 'd12', fromSide: 'bottom', to: 'd13', toSide: 'top' }]

};

const toolY = 600;
const tools = [
{ id: 't1', label: 'Tailor resume', x: 82 },
{ id: 't2', label: 'Practice in Skill Lab', x: 231 },
{ id: 't3', label: 'Build action plan', x: 380 },
{ id: 't4', label: 'Run mock interview', x: 529 },
{ id: 't5', label: 'Compare relocation offers', x: 678 }];


/** User-facing journey */
export const operationalFlow: FlowchartDef = {
  width: 780,
  height: 1090,
  nodes: [
  { id: 'o1', type: 'terminal', label: 'Open AI.TechMentor', x: 380, y: 40 },
  { id: 'o2', type: 'process', label: 'Sign up or log in', x: 380, y: 125 },
  { id: 'o3', type: 'decision', label: 'Profile complete?', x: 380, y: 235 },
  { id: 'o3n', type: 'process', label: 'Complete Profile & Experiences', x: 120, y: 235, w: 190 },
  { id: 'o4', type: 'process', label: 'View Home dashboard & next step', x: 380, y: 345, w: 230 },
  { id: 'o5', type: 'decision', label: 'Choose a tool', x: 380, y: 460 },
  ...tools.map((t) => ({ id: t.id, type: 'process' as const, label: t.label, x: t.x, y: toolY, w: 124, h: 58 })),
  { id: 'o6', type: 'process', label: 'Review AI feedback & save progress', x: 380, y: 735, w: 250 },
  { id: 'o7', type: 'decision', label: 'Ready to apply?', x: 380, y: 850 },
  { id: 'o8', type: 'process', label: 'Apply & interview with employers', x: 380, y: 965, w: 240 },
  { id: 'o9', type: 'terminal', label: 'Receive an offer', x: 380, y: 1050 }],

  edges: [
  { from: 'o1', fromSide: 'bottom', to: 'o2', toSide: 'top' },
  { from: 'o2', fromSide: 'bottom', to: 'o3', toSide: 'top' },
  { from: 'o3', fromSide: 'left', to: 'o3n', toSide: 'right', label: 'No', labelAt: [262, 225] },
  { from: 'o3n', fromSide: 'bottom', to: 'o4', toSide: 'left' },
  { from: 'o3', fromSide: 'bottom', to: 'o4', toSide: 'top', label: 'Yes', labelAt: [390, 297] },
  { from: 'o4', fromSide: 'bottom', to: 'o5', toSide: 'top' },
  ...tools.map((t) => ({ from: 'o5', fromSide: 'bottom' as const, to: t.id, toSide: 'top' as const })),
  ...tools.map((t) => ({ from: t.id, fromSide: 'bottom' as const, to: 'o6', toSide: 'top' as const })),
  { from: 'o6', fromSide: 'bottom', to: 'o7', toSide: 'top' },
  {
    from: 'o7',
    fromSide: 'right',
    to: 'o4',
    toSide: 'right',
    via: [[760, 850], [760, 345]],
    label: 'No, keep practicing',
    labelAt: [490, 840]
  },
  { from: 'o7', fromSide: 'bottom', to: 'o8', toSide: 'top', label: 'Yes', labelAt: [390, 912] },
  { from: 'o8', fromSide: 'bottom', to: 'o9', toSide: 'top' }]

};