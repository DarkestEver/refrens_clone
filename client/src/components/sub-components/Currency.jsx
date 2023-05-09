import { Select } from 'antd';
import {currencyOptions} from "../../data";

const Currency = ({ setCurrency, initialValue }) => {
  
  const handleChange = (value) => {
    console.log(`Selected: ${value}`);
    setCurrency(value);
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