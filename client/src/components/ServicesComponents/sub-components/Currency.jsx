import { Select } from 'antd';
import {currencyOptions} from "../../../data";

const Currency = ({ setCurrency, initialValue , setSymbol}) => {
  
  const handleChange = (value,symbol) => {
    console.log(`Selected: ${value}`);
    setCurrency(value);
    setSymbol(symbol.symbol);
  };
  return (
    <>
        <Select
          defaultValue={initialValue}
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

export default Currency;