import { Select } from 'antd';
import { selectOptions } from '../../data';

const SelectServices = ({ setTags , initialValue }) => {
  
  console.log("tags",initialValue);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setTags(value);
  };

  const options = [
    ...selectOptions,
    ...initialValue.map((value) => ({ label: value, value }))
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
        defaultValue={initialValue}
      />
    </>
  );
};

export default SelectServices;
