import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { embeddedLanguageFormatting } from "prettier.config.cjs";
import { useState } from "react";
import { env } from "~/env.mjs";
import { baseUrl } from "~/utils/constants";

export interface StockPrediction {
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
        <title>Stocks prediction</title>
        <meta name="description" content="Top stocks today 📈" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📈</text></svg>"/>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem] flex justify-center items-center">
            <span className="text-red-500">Stock</span>
            <span className="text-green-500">s</span>
          </h1>
          <h1 className="text-2xl font-extrabold tracking-tight text-white  flex justify-center items-center">
            <span className="text-green-400">Top stocks today 📈</span>
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8 ">

            {predictions ? predictions.slice(0,2).map((item: StockPrediction) => {
              if (item.last_day) {
                return (
                  <Link
                    key={item.stock}
                    className={`" flex px-10 py-3 max-w-xs flex-col gap-4 rounded-xl ${item.pct_change > 0 ? "bg-green-500" : "bg-red-500"}  text-white hover:bg-white/20 " `}
                    href=""
                    target="_blank"
                    style={{
                      pointerEvents: (true) ? "none" : "auto",
                    }}
                  >
                    <h3 className="text-2xl mb-2 font-bold text_center">{item.stock}</h3>
                    <h3 className="text-lg mb-2 font-bold">Today's price: ${item.last_day.toFixed(2)}</h3>
                    <h3 className="text-lg mb-2 font-bold">Predicted pct_change: {item.pct_change.toFixed(2)}</h3>
    
                    <h3 className="text-2xl font-bold">${item.predictions.toFixed(2)}
                      {
                        item.stock === "ALUA.BA" ? " ARS" : null
                      }
                      </h3>
                  </Link>
                )
              } else{
                return null
              }
              
            
            
            }) : 0}
            


          </div>
          <button onClick={
            ()=>{
              setLoading(true)
              router.push("/all")
            }
          } className=" flex items-center justify-center" >
            <h1 className={`" text-xl font-extrabold tracking-tight text-white  flex justify-center items-center hover:underline ${loading ? "animate-pulse ": " "} "`}>
              <span className={`"  ${loading ? " text-red-500": " text-green-500"} "`} >{loading ? "Loading 😁" : " See All 🤓"}</span>
            </h1>
          </button>
          
        </div>
      </main>
    </>
  );
};


export async function getServerSideProps() {
  const stocks = ['NFLX',  'TSLA',  'MELI', 'GLOB', 'KO',
  'YPF', 'MSFT', 'TS', 'SBUX', 'MCD', "AMZN", "GOOG"]
  // Fetch data from an external API
  const predictions = [];
  console.log( env.NODE_ENV);
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
  console.log(predictions);

  return {
    props: { predictions },
  };
}
export default Home;
