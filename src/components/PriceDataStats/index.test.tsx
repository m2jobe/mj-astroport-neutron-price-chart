import React from "react";
import { render, screen } from "@testing-library/react";
import PriceDataStats from ".";

const mockPriceDataStats = {
  averagePriceATOM: 10.1234,
  maxPriceATOM: 15.6789,
  minPriceATOM: 5.4321,
  averagePriceNTRN: 20.9876,
  maxPriceNTRN: 25.5432,
  minPriceNTRN: 18.8765,
};

describe("PriceDataStats", () => {
  test("renders without crashing", () => {
    render(<PriceDataStats priceDataStats={mockPriceDataStats} />);
    expect(screen.getByText("ATOM Stats")).toBeInTheDocument();
    expect(screen.getByText("NTRN Stats")).toBeInTheDocument();
  });

  test("renders null when no price data stats provided", () => {
    render(<PriceDataStats />);
    expect(screen.queryByText("ATOM Stats")).not.toBeInTheDocument();
    expect(screen.queryByText("NTRN Stats")).not.toBeInTheDocument();
  });

  test("formats prices to two decimal places", () => {
    render(<PriceDataStats priceDataStats={mockPriceDataStats} />);
    expect(screen.getByText("Average Price: 10.12")).toBeInTheDocument();
    expect(screen.getByText("Max Price: 15.68")).toBeInTheDocument();
    expect(screen.getByText("Min Price: 5.43")).toBeInTheDocument();
    expect(screen.getByText("Average Price: 20.99")).toBeInTheDocument();
    expect(screen.getByText("Max Price: 25.54")).toBeInTheDocument();
    expect(screen.getByText("Min Price: 18.88")).toBeInTheDocument();
  });
});
