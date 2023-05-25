import { Button, Divider, Input, Select, Space } from 'antd';
import { useRef, useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';

let index = 0;

const useClientName = () => {
  const [items, setItems] = useState(['Accenture']);
  const [ clientName, setClientName] = useState('');
  const [ selectedClient, setSelectedClient] = useState('');
  const inputRef = useRef(null);

  const onNameChange = (event) => {
    setClientName(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, clientName || `New item ${index++}`]);
    setClientName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleChange = (value) => {
    setSelectedClient(value);
  }

  return {
    selectedClient,
    render: (
      <Select
        placeholder="Select Client"
        style={{width: "100%"}}
        onChange={handleChange}
        dropdownRender={(menu) => (
          <>
            {menu}
            <Divider style={{ margin: '8px 0' }} />
            <Space style={{ padding: '0 8px 4px' }}>
              <Input
                placeholder="Please enter a new Client name"
                ref={inputRef}
                value={clientName}
                onChange={onNameChange}
              />
              <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                Add a Client
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

export default useClientName;
