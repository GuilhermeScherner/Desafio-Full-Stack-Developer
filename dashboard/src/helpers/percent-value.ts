export const percentValue = (change_24h: number, price: number): number => {
  const initialValue = price - change_24h;
  const fvIv = price / initialValue - 1;
  return fvIv * 100;
};
