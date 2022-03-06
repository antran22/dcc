export function formatCurrency(amount: number) {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return formatter.format(amount);
}

export function clamp(n: number, min: number, max: number) {
  if (n > max) {
    return max;
  }
  if (n < min) {
    return min;
  }
  return n;
}
