import { Button, Divider, Input, Select, Space } from 'antd';
import { useRef, useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';

let index = 0;

const useSelectBusiness = () => {
  const [items, setItems] = useState(['Prishav Technologies']);
  const [businessName, setBusinessName] = useState('');
  const [ selectedBusiness, setSelectedBusiness] = useState('');
  const inputRef = useRef(null);

  const onNameChange = (event) => {
    setBusinessName(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, businessName || `New item ${index++}`]);
    setBusinessName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleChange = (value) => {
    setSelectedBusiness(value);
  }


  return {
    selectedBusiness,
    render: (
      <Select
        placeholder="Select Business"
        style={{width: "100%"}}
        onChange={handleChange}
        dropdownRender={(menu) => (
          <>
            {menu}
            <Divider style={{ margin: '8px 0' }} />
            <Space style={{ padding: '0 8px 4px' }}>
              <Input
                placeholder="Please enter a new Business name"
                ref={inputRef}
                value={businessName}
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
    ),
  };
};

export default useSelectBusiness;
