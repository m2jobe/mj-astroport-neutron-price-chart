interface SeriesPoint {
  time: number;
  value: number;
}

interface TokenSeries {
  series: SeriesPoint[];
}

interface TokenData {
  [token: string]: TokenSeries;
}

// Function to calculate the average price for a token
function calculateAveragePrice(tokenData: TokenData, token: string): number {
  const series = tokenData[token].series;
  const totalValue = series.reduce((acc, point) => acc + point.value, 0);
  return totalValue / series.length;
}

// Function to find the maximum price for a token
function findMaxPrice(tokenData: TokenData, token: string): number {
  const series = tokenData[token].series;
  return Math.max(...series.map((point) => point.value));
}

// Function to find the minimum price for a token
function findMinPrice(tokenData: TokenData, token: string): number {
  const series = tokenData[token].series;
  return Math.min(...series.map((point) => point.value));
}

export function getPriceDataStats(tokenData: TokenData) {
  const averagePriceATOM = calculateAveragePrice(
    tokenData,
    "ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9"
  );
  const maxPriceATOM = findMaxPrice(
    tokenData,
    "ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9"
  );
  const minPriceATOM = findMinPrice(
    tokenData,
    "ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9"
  );

  const averagePriceNTRN = calculateAveragePrice(tokenData, "untrn");
  const maxPriceNTRN = findMaxPrice(tokenData, "untrn");
  const minPriceNTRN = findMinPrice(tokenData, "untrn");

  const priceDataStats = {
    averagePriceATOM,
    maxPriceATOM,
    minPriceATOM,
    averagePriceNTRN,
    maxPriceNTRN,
    minPriceNTRN,
  };

  return priceDataStats;
}
