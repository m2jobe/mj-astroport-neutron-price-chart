import React from "react";
import PriceChart from "@/components/PriceChart";
import { fetchPriceData } from "@/services/api/priceApi";
import { PriceData } from "@/types/apiTypes";
import { getPriceDataStats } from "./helpers/getPriceDataStats";
import PriceDataStats from "@/components/PriceDataStats";
import { PriceDataStatistics } from "@/types/appTypes";

interface HomeProps {
  priceDataStats?: PriceDataStatistics;
  priceData?: PriceData;
  error?: Error;
}

const Home: React.FC<HomeProps> = ({ priceData, error, priceDataStats }) => {
  if (error) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-0 md:p-16 lg:p-16 xl:16`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex mb-16">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b dark:border-neutral-800 dark:bg-zinc-800/30 lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4">
          7-day price chart of the $ATOM-$NTRN pair
        </p>
      </div>

      <PriceDataStats priceDataStats={priceDataStats} />

      <div
        data-testid="price-chart-container"
        className="relative flex place-items-center w-full"
      >
        {/* Render the PriceChart component with pre-fetched data */}
        <PriceChart priceData={priceData!} />
      </div>
    </main>
  );
};

export async function getStaticProps(): Promise<{ props: HomeProps }> {
  try {
    // Fetch price data from the API
    const priceData = await fetchPriceData();

    const priceDataStats = getPriceDataStats(priceData?.result.data?.json);

    // Pass data to the page via props
    return {
      props: { priceData, priceDataStats },
    };
  } catch (error) {
    // Handle fetch error
    return {
      props: { error: error as Error },
    };
  }
}

export default Home;
