export interface PriceData {
  result: {
    data: {
      json: {
        [token: string]: {
          series: {
            time: number;
            value: number;
          }[];
          priceChangePercentage: number;
          minValue: number;
          maxValue: number;
        };
      };
    };
  };
}
