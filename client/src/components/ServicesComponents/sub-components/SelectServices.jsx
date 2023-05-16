import { Select } from 'antd';
import { selectOptions } from '../../../data';

const SelectServices = ({ setTags , initialValue }) => {

  const handleChange = (value) => {
    setTags(value);
  };

  const options = [
    ...selectOptions,
    ...(initialValue ? initialValue.map((value) => ({ value: value, label: value })) : [])
  ];

  return (
    <>
        <Select
          mode="tags"
          style={{
            width: '100%',
          }}
          placeholder="Please Select or Type here to add categories"
          onChange={handleChange}
          tokenSeparators={[',']}
          options={options}
          value={initialValue}
        /> 
    </>
  );
};

export default SelectServices;
