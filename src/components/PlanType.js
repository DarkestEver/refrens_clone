import { Select } from 'antd';
import {planTypeOptions} from "../data";

const handleChange = (value) => {
  console.log(`Selected: ${value}`);
};
const PlanType = () => {
  
  return (
    <>
        <Select
          defaultValue="Per Project"
          onChange={handleChange}
          style={{
            width: "80%",
          }}
          options={planTypeOptions}
        />

</>
  );
};
export default PlanType;