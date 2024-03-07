import { StockPrediction } from "~/pages";
import { baseUrl } from "./constants";

 async function getPredictions() {

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
 async function postPredictions(setPredictions: any) {
  const companies = ['NFLX', 'GOOG', 'AMZN', 'TSLA', 'ALUA.BA', 'MELI', 'GLOB', 'KO', 'YPF', 'MSFT', 'TS', 'SBUX', 'MCD'];
  const predictions = [];

  for (const company of companies) {
    try {
      const res = await fetch(`${baseUrl}/prediction/${company}`);
      const prediction = await res.json();
      predictions.push(prediction);
      setPredictions(predictions); // Update state array after each prediction
    } catch (error) {
      console.log(`Error fetching prediction for ${company}: ${error}`);
    }
  }
  console.log("job done");
  
  
  // Sort predictions by pct_change
  predictions.sort((a, b) => b.pct_change - a.pct_change);

  // Remove duplicates based on 'Stock' attribute
  const filteredData = removeDuplicates(predictions, 'Stock');

  return filteredData;
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

export default {getPredictions, postPredictions}