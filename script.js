const listsection = document.getElementById("list-section");
const STOCK_API =
  "https://stock-market-api-k9vl.onrender.com/api/stocksstatsdata";
let currentstock="";
async function fetchStocks() {
  try {
    const response = await fetch(STOCK_API);
    const data = await response.json();

    const stockData = data.stocksStatsData[0];

    for (let stock in stockData) {
      //console.log(stock);
      //console.log(stockData[stock]);
      //console.log(stockData[stock].bookValue);
      //console.log(stockData[stock].profit);

      const card = document.createElement("div");
      card.classList.add("stock-card");
      card.addEventListener("click", () => {
        currentstock=stock;
        console.log(`clicked on ${stock}`);
      });
      const name = document.createElement("h2");
      name.textContent = stock;
      const bookValue = document.createElement("p");
      bookValue.textContent = `Book Value : ${stockData[stock].bookValue}`;
      const profit = document.createElement("p");
      profit.textContent = `Profit : ${(stockData[stock].profit * 100).toFixed(2)}%`;

      card.appendChild(name);
      card.appendChild(bookValue);
      card.appendChild(profit);
      listsection.appendChild(card);
    }
  } catch (error) {
    console.log(error);
  }
}

fetchStocks();
