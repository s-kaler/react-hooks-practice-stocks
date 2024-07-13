import React from "react";
import Stock from "./Stock";

function StockContainer({stocks, handleTransfer}) {
  
  
  return (
    <div>
      <h2>Stocks</h2>
      {stocks.map((stock) => (
        <Stock
          name={stock.name}
          price={stock.price}
          handleClick={() => handleTransfer(stock)}
          key={stock.id}
        />))}
    </div>
  );
}

export default StockContainer;
