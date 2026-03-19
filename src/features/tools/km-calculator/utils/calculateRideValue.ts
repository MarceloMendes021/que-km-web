export type RideRating = "good" | "acceptable" | "poor";

export type RideResult = {
  valuePerKm: number;
  rating: RideRating;
};

const THRESHOLDS = {
  good: 1.5,
  acceptable: 1.4,
};

export function calculateRideValue(price: number, distance: number): RideResult {
  const valuePerKm = price / distance;

  let rating: RideRating;

  if (valuePerKm >= THRESHOLDS.good) {
    rating = "good";
  } else if (valuePerKm >= THRESHOLDS.acceptable) {
    rating = "acceptable";
  } else {
    rating = "poor";
  }

  return { valuePerKm, rating };
}
