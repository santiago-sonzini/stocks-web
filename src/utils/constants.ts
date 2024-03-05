import { env } from "~/env.mjs";


const production = {
    url: 'https://c16-106-n-data-bi.onrender.com'
  };
  const development = {
    url: 'http://127.0.0.1:8000'
  };
  export const baseUrl = env.NODE_ENV === 'development' ? development.url : production.url;