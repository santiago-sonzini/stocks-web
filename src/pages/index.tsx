import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { embeddedLanguageFormatting } from "prettier.config.cjs";
import { useEffect, useState } from "react";
import { env } from "~/env.mjs";
import { baseUrl } from "~/utils/constants";
import getPredictions from "~/utils/predictions";

export interface StockPrediction {
  stock: string;
  predictions: number;
  last_day: number;
  pct_change: number;
}


const Home = ({ predictions }: { predictions: [StockPrediction] }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [predictionsState, setPredictions] = useState<any>([]);

  useEffect(() => {
    // Define an asynchronous function inside useEffect
    
    const fetchData = async () => {
      const more = [
        'KO', 'YPF', 'MSFT', 'TS', 'SBUX', 'MCD', "AMZN", "GOOG" ,'NFLX', 'TSLA', 'MELI', 'GLOB', ]
      // Call your asynchronous function
      const result = await getPredictions(more);
      // Update state with the returned value
      const updated = [ ...result]
      updated.sort((a, b) => b.pct_change - a.pct_change);
      console.log(updated);

      setPredictions(updated);
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
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📈</text></svg>"/>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-white">
        
        {
          predictionsState.length > 0 && predictionsState
          ?
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem] flex justify-center items-center">
            <span className="text-red-500">Stock</span>
            <span className="text-green-500">s</span>
          </h1>
          <h1 className="text-2xl font-extrabold tracking-tight text-white  flex justify-center items-center">
            <span className="text-green-400">Top stocks today 📈</span>
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8 ">

            {predictionsState ? predictionsState.slice(0,2).map((item: StockPrediction) => {
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
        :
        <h1 className={`" text-xl font-extrabold tracking-tight text-white  flex justify-center items-center hover:underline  animate-pulse  "`}>
            
              <span className={`"  " text-green-500 " "`} >{"Loading 😁"}</span>
        </h1>
      }
      </main>
    </>
  );
};

export default Home;
