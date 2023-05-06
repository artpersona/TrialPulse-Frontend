export const hasBlank = (data) => {
  const lengths = data.map((item) => item.length);
  return lengths.includes(0);
};
