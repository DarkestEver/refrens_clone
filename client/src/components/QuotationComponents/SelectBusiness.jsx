// import { Select } from 'antd';

// const onChange = (value) => {
//   console.log(`selected ${value}`);
// };

// const onSearch = (value) => {
//   console.log('search:', value);
// };

// const SelectBusiness = () => (
//   <Select
//     showSearch
//     placeholder="Select a Business"
//     optionFilterProp="children"
//     onChange={onChange}
//     onSearch={onSearch}
//     filterOption={(input, option) =>
//       (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
//     }
//     options={[
//       {
//         value: 'prishav technologies',
//         label: 'Prishav Technologies',
//       },
     
//     ]}
//   />
// );

// export default SelectBusiness;

import { Button, Divider, Input, Select, Space } from 'antd';
import { useRef, useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';

let index = 0;

const SelectBusiness = () => {
  const [items, setItems] = useState(['Prishav Technologies']);
  
  const [name, setName] = useState('');
  const inputRef = useRef(null);
  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  return (
    <Select
      placeholder="Select Business"
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider
            style={{
              margin: '8px 0',
            }}
          />
          <Space
            style={{
              padding: '0 8px 4px',
            }}
          >
            <Input
              placeholder="Please enter a new Business name"
              ref={inputRef}
              value={name}
              onChange={onNameChange}
            />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
              Add Business
            </Button>
          </Space>
        </>
      )}
      options={items.map((item) => ({
        label: item,
        value: item,
      }))}
    />
  );
};
export default SelectBusiness;