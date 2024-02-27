import { PriceDataStatistics } from "@/types/appTypes";
import React from "react";

interface Props {
  priceDataStats?: PriceDataStatistics;
}

const formatPrice = (price: number): string => {
  return price.toFixed(2);
};

const PriceDataStats: React.FC<Props> = ({ priceDataStats }) => {
  if (!priceDataStats) return null;

  const {
    averagePriceATOM,
    maxPriceATOM,
    minPriceATOM,
    averagePriceNTRN,
    maxPriceNTRN,
    minPriceNTRN,
  } = priceDataStats;

  return (
    <div
      data-testid="price-data-stats-container"
      className="grid text-center grid-cols-2 gap-4"
    >
      <div className="bg-black rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">ATOM Stats</h2>
        <p>Average Price: {formatPrice(averagePriceATOM)}</p>
        <p>Max Price: {formatPrice(maxPriceATOM)}</p>
        <p>Min Price: {formatPrice(minPriceATOM)}</p>
      </div>
      <div className="bg-black rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">NTRN Stats</h2>
        <p>Average Price: {formatPrice(averagePriceNTRN)}</p>
        <p>Max Price: {formatPrice(maxPriceNTRN)}</p>
        <p>Min Price: {formatPrice(minPriceNTRN)}</p>
      </div>
    </div>
  );
};

export default PriceDataStats;
