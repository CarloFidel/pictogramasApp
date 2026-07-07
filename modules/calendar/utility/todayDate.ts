export const todayDate = () => {
  const year = new Date().getFullYear().toString();
  const month = (new Date().getMonth() + 1).toString().padStart(2, "0");
  const day = new Date().getDate().toString().padStart(2, "0");
  const today = `${year}-${month}-${day}`;

  return today;
};
