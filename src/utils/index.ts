export function getFormatAddress(address: string): string {
  const start = address?.slice(0, 4);
  const end = address?.slice(-4);
  return `${start}...${end}`;
}

export function formatNumber(num: number | string): string {
  const absNum = Math.abs(Number(num));

  if (absNum >= 1000000000) {
    return (Number(num) / 1000000000).toFixed(3) + "B";
  } else if (absNum >= 1000000) {
    return (Number(num) / 1000000).toFixed(3) + "M";
  } else if (absNum >= 1000) {
    return (Number(num) / 1000).toFixed(3) + "K";
  } else {
    return Number(num).toFixed(3);
  }
}
