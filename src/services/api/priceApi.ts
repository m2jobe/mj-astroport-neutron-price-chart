import { PriceData } from "@/types/apiTypes";

export async function fetchPriceData(): Promise<PriceData> {
  // Construct the URL-encoded JSON payload
  const input = encodeURIComponent(
    JSON.stringify({
      json: {
        tokens: [
          "ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9",
          "untrn",
        ],
        chainId: "neutron-1",
        dateRange: "D7",
      },
    })
  );

  // Fetch data from the Astroport API
  const res = await fetch(
    `https://app.astroport.fi/api/trpc/charts.prices?input=${input}`
  );

  if (!res.ok) {
    // Handle non-successful response
    throw new Error("Failed to fetch data");
  }

  const priceData: PriceData = await res.json();
  return priceData;
}
