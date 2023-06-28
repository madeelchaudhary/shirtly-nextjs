export const getDiscountedPrice = (
  price: number,
  discountPercentage: number
) => {
  const discountExemption = (price * discountPercentage) / 100;
  const discountedPrice = price - discountExemption;
  return discountedPrice;
};
