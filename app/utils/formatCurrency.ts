export const formatCurrency = (value: number) => {
  const numberValue = Number(value);
  if (isNaN(numberValue)) {
    return value;
  }
  return numberValue.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
  });
};
