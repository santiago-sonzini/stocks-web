import { StockPrediction } from "~/pages";
import { baseUrl } from "./constants";

export default async function getPredictions() {

  // Fetch data from an external API
  console.log( baseUrl);
    try {
      const res = await fetch(`${baseUrl}/all`);
      const predictions = await res.json();
      predictions.sort((a: any, b: any) => b.pct_change - a.pct_change);

      const filteredData = removeDuplicates(predictions, 'Stock');

      return filteredData

    } catch (error) {
      console.log(error);
      return null;
    }


}
function removeDuplicates(data: StockPrediction[], prop: string): StockPrediction[] {
  const map = new Map();
  data.forEach((item: StockPrediction) => {
      if (!map.has(item.stock) || item.prediction > map.get(item.stock).Value) {
          map.set(item.stock, item);
      }
  });
  return Array.from(map.values());
}