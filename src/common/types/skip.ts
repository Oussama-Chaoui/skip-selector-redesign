export interface RawSkip {
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost: number | null;
  per_tonne_cost: number | null;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: string;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}

export interface SkipOption {
  id: number;
  size: number;
  hirePeriodDays: number;
  transportCost: number | null;
  perTonneCost: number | null;
  priceBeforeVat: number;
  vat: number;
  imageUrl?: string;
  postcode: string;
  area: string;
  forbidden: boolean;
  createdAt: string;
  updatedAt: string;
  allowedOnRoad: boolean;
  allowsHeavyWaste: boolean;
}

