import { Select } from 'antd';
import {selectOptions} from "../data";

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const SelectServices = () => (
  <Select
    mode="tags"
    style={{
      width: '100%',
    }}
    placeholder="Please Select or Type here to add categroies"
    onChange={handleChange}
    tokenSeparators={[',']}
    options={selectOptions}
  />
);
export default SelectServices;