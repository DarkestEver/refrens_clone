import { Button, Divider, Input, Select, Space } from 'antd';
import { useRef, useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';

let index = 0;

const useSelectAddress = () => {
  const [items, setItems] = useState(['Noida , sector 52 ,Uttar Pradesh , India']);
  const [address, setAddress] = useState('');
  const [ selectedAddress, setSelectedAddress] = useState('');
  const inputRef = useRef(null);

  const onAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, address || `New item ${index++}`]);
    setAddress('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleChange = (value) => {
    setSelectedAddress(value);
  }


  return {
    selectedAddress,
    render: (
      <Select
        placeholder="Select Address"
        style={{width: "100%"}}
        onChange={handleChange}
        dropdownRender={(menu) => (
          <>
            {menu}
            <Divider style={{ margin: '8px 0' }} />
            <Space style={{ padding: '0 8px 4px' }}>
              <Input
                placeholder="Please enter a new Address"
                ref={inputRef}
                value={address}
                onChange={onAddressChange}
              />
              <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                Add Address
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

export default useSelectAddress;
