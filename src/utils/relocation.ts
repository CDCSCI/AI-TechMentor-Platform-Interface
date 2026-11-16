import type { City } from '../data/cities';

const STANDARD_DEDUCTION = 15000;
const FEDERAL_BRACKETS: [number, number][] = [
[11925, 0.1],
[48475, 0.12],
[103350, 0.22],
[197300, 0.24],
[250525, 0.32],
[626350, 0.35],
[Infinity, 0.37]];

const SS_WAGE_CAP = 176100;
/** Non-housing monthly spending for a single person at cost index 100 */
const BASE_OTHER_SPEND = 1150;

function federalTax(gross: number): number {
  const taxable = Math.max(0, gross - STANDARD_DEDUCTION);
  let tax = 0;
  let lower = 0;
  for (const [upper, rate] of FEDERAL_BRACKETS) {
    if (taxable <= lower) break;
    tax += (Math.min(taxable, upper) - lower) * rate;
    lower = upper;
  }
  return tax;
}

function annualTaxes(gross: number, city: City): number {
  const fica = Math.min(gross, SS_WAGE_CAP) * 0.062 + gross * 0.0145;
  const state = Math.max(0, gross - STANDARD_DEDUCTION) * city.stateTaxRate;
  return federalTax(gross) + fica + state;
}

export interface CityBudget {
  salary: number;
  takeHome: number;
  housing: number;
  other: number;
  leftover: number;
}

export function cityBudget(salary: number, city: City, housingShare: number): CityBudget {
  const takeHome = Math.round((salary - annualTaxes(salary, city)) / 12);
  const housing = Math.round(city.rent * housingShare);
  const other = Math.round(BASE_OTHER_SPEND * city.costIndex / 100);
  return { salary, takeHome, housing, other, leftover: takeHome - housing - other };
}

/** Salary needed in `city` to keep the same monthly money left over. */
export function breakEvenSalary(targetLeftover: number, city: City, housingShare: number): number {
  let lo = 0;
  let hi = 2_000_000;
  for (let i = 0; i < 50; i++) {
    const mid = (lo + hi) / 2;
    if (cityBudget(mid, city, housingShare).leftover < targetLeftover) lo = mid;else
    hi = mid;
  }
  return Math.round(hi / 500) * 500;
}

export const usd = (n: number) =>
new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);