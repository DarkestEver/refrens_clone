import { Button, Col, Form, Input, Row, Space, Table } from 'antd';
import { CloseOutlined, PictureOutlined, PlusSquareOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useRef, useState } from 'react';

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
      <>
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />

        <tr>

        <Row gutter={[16,16]} style={{width:"100%"}}>
          <Col span={12}>
            <button className="qae-discount-btn">
                <PlusSquareOutlined style={{ color: 'rgb(115, 61, 217)', paddingRight: '8px', display:'flex',alignItems:'center' }} />
                Add Description
            </button>
          </Col>
          <Col span={12}>
            <button className="qae-discount-btn">
                <PictureOutlined style={{ color: 'rgb(115, 61, 217)', paddingRight: '8px', display:'flex',alignItems:'center' }} />
                Add Thumbnail 
            </button>
          </Col>

        </Row>
        </tr>
        
      </EditableContext.Provider>
    </Form>
    
    </>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {

  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};


const ItemTable = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: '0',
      Item: 'Television',
      Quantity: '2',
      Rate: '₹ 1',
      Amount: '₹ 1.00',
    }
  ]);
  const [count, setCount] = useState(1);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const defaultColumns = [
    {
      title: 'Item',
      dataIndex: 'Item',
      width: '40%',
      editable: true,
    },
    {
      title: 'Quantity',
      dataIndex: 'Quantity',
      editable: true,
    },
    {
      title: 'Rate',
      dataIndex: 'Rate',
      editable: true,
    },
    {
      title: 'Amount',
      dataIndex: 'Amount',
      editable: true,
    },
    {
      title: '',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
        //   <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <CloseOutlined onClick={() => handleDelete(record.key)} />
        //   </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData = {
      key: count,
      Item: `Sample Item`,
      Quantity: '1',
      Rate: `₹ 1`,
      Amount: `₹ 1.00`,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
        placeholder: `Enter ${col.title.toLowerCase()} here`,
      }),
    };
  });
  
  return (
    <Space
        direction="vertical"
        size="middle"
        style={{
        display: 'flex',
        width: "100%"
        }}
    >
      
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        dataSource={dataSource}
        columns={columns}
        style={{
            width:"100%",
        }}
        pagination={false}
      />
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
        icon={<PlusSquareOutlined />}
        className='qae-btn qae-dashed-btn'
      >
        Add new Line
      </Button>
    </Space>
  );
};

export default ItemTable;