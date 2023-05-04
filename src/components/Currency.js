import { Select } from 'antd';
import {currencyOptions} from "../data";

const handleChange = (value) => {
  console.log(`Selected: ${value}`);
};
const App = () => {
  
  return (
    <>
        <Select
          defaultValue="Indian Rupee(INR, ₹)"
          onChange={handleChange}
          style={{
            width: "80%",
          }}
          options={currencyOptions}
        />

</>
  );
};
export default App;