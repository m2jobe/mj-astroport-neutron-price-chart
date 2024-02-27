import { getPriceDataStats } from "../getPriceDataStats";

describe("getPriceDataStats", () => {
  const tokenData = {
    "ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9": {
      series: [
        { time: 1638211200, value: 10 },
        { time: 1638297600, value: 15 },
        { time: 1638384000, value: 20 },
      ],
    },
    untrn: {
      series: [
        { time: 1638211200, value: 5 },
        { time: 1638297600, value: 8 },
        { time: 1638384000, value: 12 },
      ],
    },
  };

  test("calculates average, max, and min prices for ATOM correctly", () => {
    const expected = {
      averagePriceATOM: (10 + 15 + 20) / 3,
      maxPriceATOM: 20,
      minPriceATOM: 10,
    };
    const result = getPriceDataStats(tokenData);
    expect(result.averagePriceATOM).toBe(expected.averagePriceATOM);
    expect(result.maxPriceATOM).toBe(expected.maxPriceATOM);
    expect(result.minPriceATOM).toBe(expected.minPriceATOM);
  });

  test("calculates average, max, and min prices for NTRN correctly", () => {
    const expected = {
      averagePriceNTRN: (5 + 8 + 12) / 3,
      maxPriceNTRN: 12,
      minPriceNTRN: 5,
    };
    const result = getPriceDataStats(tokenData);
    expect(result.averagePriceNTRN).toBe(expected.averagePriceNTRN);
    expect(result.maxPriceNTRN).toBe(expected.maxPriceNTRN);
    expect(result.minPriceNTRN).toBe(expected.minPriceNTRN);
  });
});
