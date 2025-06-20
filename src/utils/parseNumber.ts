export const parseNumberParam = (
  paramName: string | null | undefined
): number | null => {
  if (
    paramName === undefined ||
    paramName === null ||
    paramName.trim() === ""
  ) {
    return null; // Parameter not found or empty string, send null
  }
  const parsed = parseFloat(paramName);
  if (isNaN(parsed)) {
    return null; // Not a valid number, send null
  }
  return parsed; // Return the number if valid
};
