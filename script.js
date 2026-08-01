//Calling API
const CHART_API = "https://stock-market-api-k9vl.onrender.com/api/stocksdata";
const STOCK_API =
  "https://stock-market-api-k9vl.onrender.com/api/stocksstatsdata";
const DETAILS_API = "https://stock-market-api-k9vl.onrender.com/api/profiledata";
//Selecting the elements from the DOM
const listsection = document.getElementById("list-section");
const chartCanvas = document.querySelector("#chart");
const btn = document.querySelector("#buttons");

//Initializing variables to store the current required information
let currentstock = "";
let currentduration = "3mo";
let chartInstance = null;

// Adding event listeners to the buttons to load the chart with the selected duration
for (let button of btn.children) {
  button.addEventListener("click", () => {
    if (currentstock === "") {
      alert("Please select a stock first.");
      return;
    }
    currentduration = button.textContent;
    loadChart(currentstock, currentduration);
  });
}


// Function to fetch stock data and create stock cards
async function fetchStocks() {
  try {
    const response = await fetch(STOCK_API);
    const data = await response.json();
    const stockData = data.stocksStatsData[0];

    for (let stock in stockData) {
      const card = document.createElement("div");
      card.classList.add("stock-card");
      card.addEventListener("click", () => {
        currentstock = stock;
        loadChart(stock, currentduration);
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
// Call the stocks value and timeline data from the API and load the chart
async function loadChart(stockname, duration) {
  try {
    const response = await fetch(CHART_API);
    const data = await response.json();

    const values = data.stocksData[0][stockname][duration].value;
    const timestamps = data.stocksData[0][stockname][duration].timeStamp;
    const labels = [];

    for (let i = 0; i < timestamps.length; i++) {
      const date = new Date(timestamps[i] * 1000);
      const formattedDate = date.toLocaleDateString();
      labels.push(formattedDate);
    }

    // Destroy the previous chart instance if it exists
    if (chartInstance) {
      chartInstance.destroy();
    }
    // Create a new chart
    const ctx = chartCanvas.getContext("2d");
    chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: stockname,
            data: values,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            fill: false,
            pointRadius: 0,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
}

//fetchStocks();

async function stockdetails(stockname) {
  try {
    const response = await fetch(DETAILS_API);
    const data = await response.json();
    const stockData = data.stocksProfileData[0][stockname]["summary"];
    console.log(stockData);
  } catch (error) {
    console.log(error);
  }
}
stockdetails("AAPL");
