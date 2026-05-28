export const calRatingPercentage = (
  ratingTypeCount: number,
  totalRating: number
): `${number}%` => {

  if (!totalRating || totalRating === 0) {
    return "0%";
  }

  const cal = Math.round(
    (ratingTypeCount / totalRating) * 100
  );

  return `${cal}%`;
};