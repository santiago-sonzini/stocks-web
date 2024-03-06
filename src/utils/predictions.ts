import { StockPrediction } from "~/pages";
import { baseUrl } from "./constants";

export default async function getPredictions(stocks: string[]) {

  // Fetch data from an external API
  console.log( baseUrl);
  const promises = stocks.flatMap(async (item) => {
    try {
      const res = await fetch(`${baseUrl}/prediction/${item}`);
      return res.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  });

  const predictions = await Promise.all(promises);

  predictions.sort((a: any, b: any) => b.pct_change - a.pct_change);
  return predictions
}