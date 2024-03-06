import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { embeddedLanguageFormatting } from "prettier.config.cjs";
import { useEffect, useState } from "react";
import PaginatedItems from "~/components/Pagination";
import { baseUrl } from "~/utils/constants";
import getPredictions from "~/utils/predictions";

interface StockPrediction {
  stock: string;
  predictions: number;
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
        <title>All stocks</title>
        <meta name="description" content="All off our stocks predictions 📈" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📈</text></svg>" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-white">
        {
          predictionsState.length > 0 && predictionsState
          ?
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
              {predictionsState && predictionsState.length > 0 ?
                <PaginatedItems itemsPerPage={4} items={predictionsState} /> : null}
  
  
  
          </div>
          :
          <h1 className={`" text-xl font-extrabold tracking-tight text-white  flex justify-center items-center hover:underline  animate-pulse  "`}>
              
                <span className={`"  ${loading ? "text-green-500 ": " text-red-500"} "`} >{"Loading 😁"}</span>
          </h1>
        }
      </main>
    </>
  );
};




export default Home;
