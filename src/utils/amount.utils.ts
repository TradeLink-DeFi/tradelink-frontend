export const formatAmount = (amount: string): string => {
  const numericAmount = parseFloat(amount);
  if (numericAmount >= 1000000) {
    return (numericAmount / 1000000).toFixed(1) + "M";
  } else if (numericAmount >= 1000) {
    return (numericAmount / 1000).toFixed(1) + "K";
  } else {
    return amount;
  }
};
