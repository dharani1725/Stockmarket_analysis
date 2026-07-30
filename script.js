const STOCK_API =
  "https://stock-market-api-k9vl.onrender.com/api/stocksstatsdata";

async function fetchStocks() {

    try {

        console.log("Fetching Data...");

        const response = await fetch(STOCK_API);

        const data = await response.json();

        console.log(data);

    }
    catch(error){

        console.log(error);

    }

}
fetchStocks();