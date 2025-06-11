export const validateHour = (hour: string): boolean => {
  const hourRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return hourRegex.test(hour);
};
