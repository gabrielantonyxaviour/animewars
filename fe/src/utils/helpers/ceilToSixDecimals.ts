export default function ceilToSixDecimals(number: string) {
  const factor = 10 ** 6;
  return Math.ceil(parseFloat(number) * factor) / factor;
}
