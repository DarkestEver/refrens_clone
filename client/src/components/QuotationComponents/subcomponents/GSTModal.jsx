import "./GSTModal.css";

import { Button, Divider, Input, Radio, Select, Space } from 'antd';
import { useRef, useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';

let index = 0;

const GSTModal = () => {
    const [items, setItems] = useState(['NONE','GST (India)','VAT','PPN','SST','HST','TAX']);
    const [selectedValue, setSelectedValue] = useState(undefined);

    const handleSelectChange = (value) => {
       setSelectedValue(value);
       console.log("Selected value: "+ value);
    };

    const [value, setValue] = useState();
    const onChange = (e) => {
      console.log('radio checked', e.target.value);
      setValue(e.target.value);
    };
  
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
    <>
    <div> 
        <div>
            <div className="gst-container">
                <div className="gst-label">
                    <label>Select Tax Type</label>
                    <span className="required">*</span>
                </div>
            
                <Select
                    placeholder="Select GST Type"
                    style={{marginBottom:'1rem'}}
                    onChange={handleSelectChange}
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
                            placeholder="Create a new GST Type"
                            ref={inputRef}
                            value={name}
                            onChange={onNameChange}
                            />
                            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                Create New Tax
                            </Button>
                        </Space>
                        </>
                    )}
                    options={items.map((item) => ({
                        label: item,
                        value: item,
                    }))}
                    />
        
            </div>

            <div className="gst-container">
            <div className="gst-label">
                <label>GST Type</label>
                <span className="required">*</span>
            </div>
            <Radio.Group onChange={onChange} value={value}>
                <Radio value={'IGST'}>IGST</Radio>
                <Radio value={'CGST & SGST'}>CGST & SGST</Radio>
            </Radio.Group>
            </div>
        </div>
    </div>
    </> 
    )
}

export default GSTModal;