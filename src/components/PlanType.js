import { Select } from 'antd';
import {planTypeOptions} from "../data";

const PlanType = ({handlePlanType}) => {
  
  const handleChange = (value) => {
    handlePlanType(value);
  };
  
  return (
    <>
        <Select
          placeholder="Select a plan type"
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