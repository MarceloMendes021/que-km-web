export type RideRating = "good" | "acceptable" | "poor";

export type RideResult = {
  valuePerKm: number;
  rating: RideRating;
};

export type RideThresholds = {
  good: number;
  acceptable: number;
};

export const DEFAULT_THRESHOLDS: RideThresholds = {
  good: 1.5,
  acceptable: 1.4,
};

export function calculateRideValue(price: number, distance: number, thresholds: RideThresholds = DEFAULT_THRESHOLDS): RideResult {
  const valuePerKm = price / distance;

  let rating: RideRating;

  if (valuePerKm >= thresholds.good) {
    rating = "good";
  } else if (valuePerKm >= thresholds.acceptable) {
    rating = "acceptable";
  } else {
    rating = "poor";
  }

  return { valuePerKm, rating };
}
