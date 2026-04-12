export const translateEnums = (id, enums, language = "cs") => {
  const result = enums.find((item) => item.code === id)?.names?.[language];
  return result ?? "";
};
