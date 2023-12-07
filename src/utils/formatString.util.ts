export function truncateString(
  inputString: string,
  prefixLength: number = 5,
  suffixLength: number = 5
): string {
  if (!inputString) return "";
  if (inputString.length <= prefixLength + suffixLength) {
    return inputString;
  }
  const prefix = inputString.slice(0, prefixLength);
  const suffix = inputString.slice(-suffixLength);
  return `${prefix}...${suffix}`;
}

export function capitalize(inputString: string): string {
  const firstChar = inputString.charAt(0).toUpperCase();
  const remainingChars = inputString.slice(1);
  return `${firstChar}${remainingChars}`;
}
