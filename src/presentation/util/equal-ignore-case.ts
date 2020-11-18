export const equalsIgnoreCase = (
  stringCompare: string,
  stringToCompare: string
): boolean => {
  if (!stringCompare || !stringToCompare) return false

  return stringCompare.toUpperCase() === stringToCompare.toUpperCase()
}
