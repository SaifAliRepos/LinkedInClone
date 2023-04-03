
export const convertDate = (yourDate) => {

  const date = new Date(yourDate);

  return date.toISOString().substring(0, 10);
}
