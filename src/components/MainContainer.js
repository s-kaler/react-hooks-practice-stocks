import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
    .then((res) => res.json())
    .then ((fetchedStocks) => setStocks(fetchedStocks))
  },
  [])

  function onAddStock(transferredStock) {
    const filteredStocks = stocks.filter((stock) => transferredStock.id !== stock.id)
    setStocks(filteredStocks)
    console.log("filtered")
    setPortfolio([...portfolio, transferredStock])
  }

  function onRemoveStock(transferredStock) {
    const filteredStocks = portfolio.filter((stock) => transferredStock.id !== stock.id)
    setPortfolio(filteredStocks)
    console.log("filtered")
    setStocks([...stocks, transferredStock])
  }

  function handleSort(e) {
    let sortedStocks = [...stocks];
    if(e.target.value === "Alphabetically") {
      //console.log("filtered alphabetically")
      sortedStocks.sort((stock1, stock2) => {
        if ( stock1.name < stock2.name ){
          return -1;
        }
        if ( stock1.name > stock2.name ){
          return 1;
        }
        return 0;
      })
    }
    else if(e.target.value === "Price"){
      //console.log("filtered by price")
      sortedStocks.sort((stock1, stock2) => stock2.price - stock1.price)
    }
    //console.log(sortedStocks)
    setStocks(sortedStocks)
  }

  function handleFilter(e) {
    console.log(e.target.value)
    setFilter(e.target.value)
  }

  return (
    <div>
      <SearchBar onSort={handleSort} onFilter={handleFilter}/>
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={!filter ? stocks : stocks.filter((stock) => stock.type === filter)} handleTransfer={onAddStock}/>
        </div>
        <div className="col-4">
          <PortfolioContainer portfolioStocks={portfolio} handleTransfer={onRemoveStock}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
