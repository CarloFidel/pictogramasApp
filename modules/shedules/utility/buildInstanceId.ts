export const buildInstanceId = (id: number | string): string => {
  return `${id}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};
