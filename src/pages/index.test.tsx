// index.test.tsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Home, { getStaticProps } from "../pages/index"; // Adjust the path as needed
import { PriceData } from "@/types/apiTypes";
import { fetchPriceData } from "@/services/api/priceApi";
import { PriceDataStatistics } from "@/types/appTypes";

// Mock the fetchPriceData function
jest.mock("@/services/api/priceApi", () => ({
  fetchPriceData: jest.fn().mockResolvedValue({
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
  }),
}));

let mockedPriceData: PriceData;
let mockedPriceDataStats: PriceDataStatistics;

beforeAll(() => {
  mockedPriceData = {
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
  mockedPriceDataStats = {
    averagePriceATOM: 10,
    maxPriceATOM: 10,
    minPriceATOM: 10,
    averagePriceNTRN: 20,
    maxPriceNTRN: 20,
    minPriceNTRN: 20,
  };
});

describe("Home Page", () => {
  test("renders home page with fetched data and price data statistics", async () => {
    // Mock the API call to return the mocked data
    (
      fetchPriceData as jest.MockedFunction<typeof fetchPriceData>
    ).mockResolvedValueOnce(mockedPriceData);

    // Render the component with mocked data and priceDataStats
    render(
      <Home priceData={mockedPriceData} priceDataStats={mockedPriceDataStats} />
    );

    // Ensure that the component renders with the fetched data
    await waitFor(() => {
      expect(
        screen.getByText("7-day price chart of the $ATOM-$NTRN pair")
      ).toBeInTheDocument();
      // Assert that the PriceChart and DataStats component are rendered
      expect(screen.getByTestId("price-chart-container")).toBeInTheDocument();
      expect(
        screen.getByTestId("price-data-stats-container")
      ).toBeInTheDocument();
    });
  });

  test("handles fetch error", async () => {
    // Mock the API call to throw an error
    const mockedError = new Error("Fetch error");
    (
      fetchPriceData as jest.MockedFunction<typeof fetchPriceData>
    ).mockRejectedValueOnce(mockedError);

    // Render the component
    render(<Home error={mockedError} />);

    // Ensure that the component displays the error message
    await waitFor(() => {
      expect(screen.getByText(/Error: Fetch error/i)).toBeInTheDocument(); // Using a regex to match the error message
    });
  });
});
