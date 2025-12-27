export const getSubstring = (s: string, where: "beforeLast" | "afterLast", n: number, pattern: string) => {
  let index = -1;
  for (var i = s.length - 1; i > 0; i--) {
    if (s.charAt(i) === pattern) {
      n = n - 1;
    }
    if (n === 0) {
      index = i;
      break;
    }
  }
  if (where === "beforeLast") {
    return s.substring(0, index);
  }
  return s.substring(index);
};
