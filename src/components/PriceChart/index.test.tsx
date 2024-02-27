import React, { ReactNode } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import PriceChart from ".";
import { PriceData } from "@/types/apiTypes";

jest.mock("recharts", () => {
  const OriginalModule = jest.requireActual("recharts");
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: { children: ReactNode }) => (
      <OriginalModule.ResponsiveContainer width={600} height={800}>
        {children}
      </OriginalModule.ResponsiveContainer>
    ),
  };
});

const mockPriceData: PriceData = {
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

describe("PriceChart", () => {
  test("renders PriceChart component with fetched data", async () => {
    render(<PriceChart priceData={mockPriceData} />);

    // Wait for Recharts to render
    await waitFor(() => {
      expect(screen.getByText("$ATOM Price")).toBeInTheDocument();
      expect(screen.getByText("$NTRN Price")).toBeInTheDocument();
    });
  });

  test("renders 'No data available' when priceData is empty", async () => {
    render(<PriceChart priceData={{ result: { data: { json: {} } } }} />);
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });
});
