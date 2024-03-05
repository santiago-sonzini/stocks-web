import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { embeddedLanguageFormatting } from "prettier.config.cjs";
import { useState } from "react";
import PaginatedItems from "~/components/Pagination";
import { baseUrl } from "~/utils/constants";

interface StockPrediction {
  stock: string;
  predictions: number;
  last_day: number;
  pct_change: number;
}


const Home = ({ predictions }: { predictions: [StockPrediction] }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  return (
    <>
      <Head>
        <title>All stocks</title>
        <meta name="description" content="All off our stocks predictions 📈" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📈</text></svg>" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          
        <button onClick={
            ()=>{
              setLoading(true)
              router.push("/")
            }
          } className=" flex items-center justify-center" >
            <h1 className={`" text-xl font-extrabold tracking-tight text-white  flex justify-center items-center hover:underline ${loading ? "animate-pulse ": " "} "`}>
              {loading ? null : <span className="mb-2 mr-2">👈</span>}
              <span className={`"  ${loading ? "text-green-500 ": " text-red-500"} "`} >{loading ? "Loading 😁" : " Go back"}</span>
            </h1>
          </button>
            {predictions ?
              <PaginatedItems itemsPerPage={4} items={predictions} /> : 0}



        </div>
      </main>
    </>
  );
};


export async function getServerSideProps() {
  const stocks = ['NFLX', 'TSLA', 'MELI', 'GLOB', 'KO',
    'YPF', 'MSFT', 'TS', 'SBUX', 'MCD', "AMZN", "GOOG"]
  // Fetch data from an external API
  const predictions = [];

  for (let i = 0; i < stocks.length; i++) {
    const item = stocks[i];
    try {
      const res = await fetch(`${baseUrl}/prediction/${item}`);
      const data = await res.json();
      predictions.push(data);
    } catch (error) {
      console.log(error);
    }
  }
  predictions.sort((a, b) => b.pct_change - a.pct_change);
  console.log(predictions);

  return {
    props: { predictions },
  };
}
export default Home;
