import { render } from "@testing-library/react";
import {
  getCombinedData,
  getUniqueDates,
  getTokenDisplayNames,
  CombinedDataEntry,
} from "../priceChartHelpers";
import { PriceData } from "@/types/apiTypes";

describe("priceChartHelper", () => {
  describe("when priceData is present", () => {
    const priceData: PriceData = {
      result: {
        data: {
          json: {
            "ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9":
              {
                series: [
                  { time: 1638211200, value: 10 },
                  { time: 1638297600, value: 15 },
                ],
                priceChangePercentage: 0.5,
                minValue: 10,
                maxValue: 15,
              },
            untrn: {
              series: [
                { time: 1638211200, value: 20 },
                { time: 1638297600, value: 25 },
              ],
              priceChangePercentage: 0.25,
              minValue: 20,
              maxValue: 25,
            },
          },
        },
      },
    };

    test("getCombinedData returns correct combined data", () => {
      const combinedData = getCombinedData(priceData);
      expect(combinedData).toHaveLength(2);
      expect(combinedData[0].time).toBe("2021-11-29");
      expect(combinedData[1].time).toBe("2021-11-30");
    });

    test("getUniqueDates returns unique dates", () => {
      const combinedData = getCombinedData(priceData);
      const uniqueDates = getUniqueDates(combinedData);
      expect(uniqueDates).toEqual(["2021-11-29", "2021-11-30"]);
    });

    test("getTokenDisplayNames returns correct token display names", () => {
      const tokenDisplayNames = getTokenDisplayNames();
      expect(tokenDisplayNames).toEqual({
        "ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9":
          "$ATOM",
        untrn: "$NTRN",
      });
    });
  });

  describe("when priceData is not present", () => {
    const emptyPriceData: PriceData = {
      result: {
        data: {
          json: {},
        },
      },
    };

    test("getCombinedData returns empty array when price data is empty", () => {
      const combinedData = getCombinedData(emptyPriceData);
      expect(combinedData).toEqual([]);
    });

    test("getUniqueDates returns empty array when combined data is empty", () => {
      const combinedData: CombinedDataEntry[] = [];
      const uniqueDates = getUniqueDates(combinedData);
      expect(uniqueDates).toEqual([]);
    });
  });
});
