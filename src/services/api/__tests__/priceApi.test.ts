import { fetchPriceData } from "../priceApi";
import { PriceData } from "@/types/apiTypes";

describe("fetchPriceData", () => {
  const mockPriceData: PriceData = {
    result: {
      data: {
        json: {
          "ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9":
            {
              series: [{ time: 1638211200, value: 10 }],
              priceChangePercentage: 0.5,
              minValue: 10,
              maxValue: 15,
            },
          untrn: {
            series: [{ time: 1638211200, value: 20 }],
            priceChangePercentage: 0.25,
            minValue: 20,
            maxValue: 25,
          },
        },
      },
    },
  };

  beforeEach(() => {
    // Mock the fetch function
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockPriceData),
    } as Response);
  });

  afterEach(() => {
    // Restore the original fetch function after each test
    jest.restoreAllMocks();
  });

  test("fetchPriceData returns expected price data", async () => {
    const priceData = await fetchPriceData();

    expect(priceData).toEqual(mockPriceData);
  });

  test("fetchPriceData handles non-successful response", async () => {
    // Mock the fetch function to return a non-successful response
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    } as Response);

    // Act and Assert
    await expect(fetchPriceData()).rejects.toThrow("Failed to fetch data");
  });
});
