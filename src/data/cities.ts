export interface City {
  id: string;
  name: string;
  state: string;
  /** Cost-of-living index, US average = 100 */
  costIndex: number;
  /** Median one-bedroom rent, USD / month */
  rent: number;
  /** Approximate effective state + local income tax rate on taxable income */
  stateTaxRate: number;
}

export const cities: City[] = [
{ id: 'rdu', name: 'Raleigh–Durham', state: 'NC', costIndex: 105, rent: 1650, stateTaxRate: 0.0425 },
{ id: 'austin', name: 'Austin', state: 'TX', costIndex: 118, rent: 1850, stateTaxRate: 0 },
{ id: 'dallas', name: 'Dallas', state: 'TX', costIndex: 110, rent: 1600, stateTaxRate: 0 },
{ id: 'atlanta', name: 'Atlanta', state: 'GA', costIndex: 112, rent: 1750, stateTaxRate: 0.0539 },
{ id: 'denver', name: 'Denver', state: 'CO', costIndex: 128, rent: 1950, stateTaxRate: 0.044 },
{ id: 'chicago', name: 'Chicago', state: 'IL', costIndex: 120, rent: 2000, stateTaxRate: 0.0495 },
{ id: 'pittsburgh', name: 'Pittsburgh', state: 'PA', costIndex: 95, rent: 1350, stateTaxRate: 0.0607 },
{ id: 'dc', name: 'Washington', state: 'DC', costIndex: 152, rent: 2500, stateTaxRate: 0.07 },
{ id: 'boston', name: 'Boston', state: 'MA', costIndex: 150, rent: 2900, stateTaxRate: 0.05 },
{ id: 'nyc', name: 'New York City', state: 'NY', costIndex: 168, rent: 3600, stateTaxRate: 0.1 },
{ id: 'seattle', name: 'Seattle', state: 'WA', costIndex: 152, rent: 2350, stateTaxRate: 0 },
{ id: 'sf', name: 'San Francisco', state: 'CA', costIndex: 178, rent: 3200, stateTaxRate: 0.075 }];


export const housingModes = [
{ id: 'solo', label: 'Solo one-bedroom', share: 1 },
{ id: 'roommates', label: 'Shared with roommates', share: 0.6 },
{ id: 'partner', label: 'Split with a partner', share: 0.5 }] as
const;