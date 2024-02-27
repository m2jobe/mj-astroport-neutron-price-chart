import { PriceData } from "@/types/apiTypes";

export interface CombinedDataEntry {
  time: string;
  [key: string]: number | string | null;
}

export function getCombinedData(priceData: PriceData): CombinedDataEntry[] {
  const seriesData = priceData?.result?.data?.json;

  if (!seriesData) {
    return [];
  }

  const tokens = Object.keys(seriesData);

  if (tokens.length < 2) {
    return [];
  }

  const token1Series = seriesData[tokens[0]].series;
  const token2Series = seriesData[tokens[1]].series;

  if (!token1Series || !token2Series) {
    return [];
  }

  const allTimesSet = new Set<number>([
    ...token1Series.map((point) => point.time),
    ...token2Series.map((point) => point.time),
  ]);

  const allTimes = Array.from(allTimesSet).sort((a, b) => a - b);

  const combinedData = allTimes.map((time) => ({
    time: new Date(time * 1000).toLocaleDateString(),
    [tokens[0]]:
      token1Series.find((point) => point.time === time)?.value || null,
    [tokens[1]]:
      token2Series.find((point) => point.time === time)?.value || null,
  }));

  return combinedData;
}

export function getUniqueDates(combinedData: CombinedDataEntry[]): string[] {
  return combinedData
    .map((entry) => entry.time)
    .filter((date, index, self) => self.indexOf(date) === index);
}

export function getTokenDisplayNames(): { [key: string]: string } {
  return {
    "ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9":
      "$ATOM",
    untrn: "$NTRN",
    // Add more mappings as needed
  };
}
