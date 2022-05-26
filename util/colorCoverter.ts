export function hexToRGB(h: string, a?: number) {
  let r = 0, g = 0, b = 0;

  // 3 digits
  if (h.length == 4) {
    r = parseInt("0x" + h[1] + h[1], 16);
    g = parseInt("0x" + h[2] + h[2], 16);
    b = parseInt("0x" + h[3] + h[3], 16);

  // 6 digits
  } else if (h.length == 7) {
    r = parseInt("0x" + h[1] + h[2], 16);
    g = parseInt("0x" + h[3] + h[4], 16);
    b = parseInt("0x" + h[5] + h[6], 16);
  }

  return  a ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;
}