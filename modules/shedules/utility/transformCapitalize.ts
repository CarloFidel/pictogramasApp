export const transformCapitalize = (text: string) => {
  const textCapitalize = text.charAt(0).toUpperCase() + text.slice(1);
  return textCapitalize;
};
