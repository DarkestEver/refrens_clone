import { Select } from 'antd';
import {planTypeOptions} from "../../../data";

const PlanType = ({handlePlanType , initialValue }) => {
  
  const handleChange = (value) => {
    handlePlanType(value);
  };
  
  return (
    <>
        <Select
          defaultValue={initialValue}
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