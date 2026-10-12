export type LogoVariant = 'sprout' | 'summit' | 'guide' | 'steps';
export type LogoTone = 'onDark' | 'onLight';

export interface LogoConcept {
  id: LogoVariant;
  name: string;
  idea: string;
  rationale: string;
  wordmark: 'sans' | 'serif';
}