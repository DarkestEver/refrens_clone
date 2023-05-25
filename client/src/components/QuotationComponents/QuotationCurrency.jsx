import { Select } from 'antd';
import {currencyOptions} from "../../data";
import { useState } from "react";

const useQuotationCurrency = () => {
  const [ currency ,setCurrency ] = useState("INR");
  const [ symbol ,setSymbol ] = useState("₹");

  const handleChange = (value,symbol) => {
    const regex = /\((.*?)\)/;
    const match = value.match(regex);
    const shortForm = match ? match[1] : "";
    console.log(shortForm);
    setCurrency(shortForm);
    setSymbol(symbol.symbol);
  };
  
  return {
    currency,
    symbol,
    render: (
    <>
        <Select
          defaultValue={"Indian Rupee (INR)"}
          placeholder="Select a Currency"
          onChange={handleChange}
          style={{
            width: "80%",
          }}
          options={currencyOptions}
          />
          
    </>      
    )
  };
};

export default useQuotationCurrency;