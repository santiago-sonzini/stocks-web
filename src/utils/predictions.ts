import { baseUrl } from "./constants";

export default async function getPredictions() {
    const stocks = ['NFLX',  'TSLA',  'MELI', 'GLOB', 'KO',
  'YPF', 'MSFT', 'TS', 'SBUX', 'MCD', "AMZN", "GOOG"]
  // Fetch data from an external API
  const predictions = [];
  console.log( baseUrl);
  for (let i = 0; i < stocks.length; i++) {
    const item = stocks[i];
    try {
      const res = await fetch(`${baseUrl}/prediction/${item}`);
      const data = await res.json();
      predictions.push(data);
    } catch (error) {
    }
  }
  predictions.sort((a, b) => b.pct_change - a.pct_change);
  return predictions
}