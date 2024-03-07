import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { embeddedLanguageFormatting } from "prettier.config.cjs";
import { useEffect, useState } from "react";
import { env } from "~/env.mjs";
import { baseUrl } from "~/utils/constants";
import predictions from "~/utils/predictions";
import getPredictions from "~/utils/predictions";

export interface StockPrediction {
  stock: string;
  prediction: number;
  last_day: number;
  pct_change: number;
}


const Home = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [predictionsState, setPredictions] = useState<any>([]);

  useEffect(() => {
    // Define an asynchronous function inside useEffect

    const fetchData = async () => {

      // Call your asynchronous function
      const result = await predictions.getPredictions();
      // Update state with the returned value

      if (result) {
        const updated = [...result]
        updated.sort((a, b) => b.pct_change - a.pct_change);
        console.log(updated.slice(0, 12));

        setPredictions(updated);
      }


    };

    // Call the fetchData function
    fetchData();
    console.log("predictionsState");
    console.log(predictionsState.length);


  }, []); // Empty dependency array means this effect will only run once after the initial render
  return (
    <>
      <Head>
        <title>Stocks prediction</title>
        <meta name="description" content="Top stocks today 📈" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📈</text></svg>" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-white">

        {

          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem] flex justify-center items-center">
              <span className="text-red-500">Stock</span>
              <span className="text-green-500">s</span>
            </h1>
            <button onClick={() => {
              setLoading(true)
              predictions.postPredictions(setPredictions)
              setLoading(false)
            }} className=" bg-green-500 px-5 py-2 rounded-md text-white font-bold">
             { loading ? "Generate" : "Loading"}
            </button>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8 ">
              {
                predictionsState.length > 0 &&
                predictionsState.map((prediction: StockPrediction, index: number) => (
                  <div key={index}>
                    <p>Stock: {prediction.stock}</p>
                    <p>Predictions: {prediction.prediction}</p>
                    <p>Last Day: {prediction.last_day}</p>
                    <p>Percentage Change: {prediction.pct_change}</p>
                  </div>
                ))
              }



            </div>


          </div>

        }
      </main>
    </>
  );
};

export default Home;
