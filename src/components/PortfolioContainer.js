import React from "react";
import Stock from "./Stock";

function PortfolioContainer({portfolioStocks, handleTransfer}) {
  return (
    <div>
      <h2>My Portfolio</h2>
      {
        portfolioStocks.map((stock) => (
          <Stock
            name={stock.name}
            price={stock.price}
            handleClick={() => handleTransfer(stock)}
            key={stock.id}
          />))
      }
    </div>
  );
}

export default PortfolioContainer;
