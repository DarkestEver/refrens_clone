import { Select } from 'antd';
import {currencyOptions} from "../../data";

const QuotationCurrency = ({ setCurrency, initialValue , setCurrencySymbol}) => {
  
  const handleChange = (value,symbol) => {
    console.log(`Selected: ${value}`);
    // setCurrency(value);
    setCurrencySymbol(symbol.symbol);
  };
  
  return (
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

  );
};

export default QuotationCurrency;