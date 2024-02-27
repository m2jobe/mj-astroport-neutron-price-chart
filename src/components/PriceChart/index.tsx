// PriceChart.tsx

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";
import {
  getCombinedData,
  getUniqueDates,
  getTokenDisplayNames,
} from "./helpers/priceChartHelpers";
import { PriceData } from "@/types/apiTypes";

interface PriceChartProps {
  priceData: PriceData;
}

const PriceChart: React.FC<PriceChartProps> = ({ priceData }) => {
  const combinedData = getCombinedData(priceData);
  const uniqueDates = getUniqueDates(combinedData);
  const tokenDisplayNames = getTokenDisplayNames();

  const tokens = Object.keys(priceData?.result?.data?.json || {});

  if (!combinedData.length) {
    return <div>No data available</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={600}>
      <LineChart
        data={combinedData}
        margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          tickFormatter={(value) => value}
          ticks={uniqueDates}
        />
        {tokens.map((token, index) => (
          <YAxis
            key={index}
            yAxisId={token}
            orientation={index === 0 ? "left" : "right"}
            domain={[
              priceData.result.data.json[token].minValue,
              priceData.result.data.json[token].maxValue,
            ]}
            tickFormatter={(value) => value.toFixed(2)}
          >
            <Label
              value={`${tokenDisplayNames[token]} Price`}
              position={index === 0 ? "insideLeft" : "insideRight"}
              angle={-90}
              style={{ textAnchor: "middle", fontSize: 16 }}
            />
          </YAxis>
        ))}
        <Tooltip />
        {tokens.map((token, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey={token}
            stroke={index === 0 ? "#8884d8" : "#82ca9d"}
            name={tokenDisplayNames[token]}
            yAxisId={token}
          />
        ))}
        <Legend wrapperStyle={{ position: "relative" }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PriceChart;
