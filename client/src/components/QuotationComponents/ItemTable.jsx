import { Button, Col, Form, Input, Row, Space, Table } from 'antd';
import { CloseOutlined, PictureOutlined, PlusSquareOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useRef, useState } from 'react';

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import SignatureUpload from "./subcomponents/SignatureUpload";

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [ isAddDescription , setIsAddDescription ] = useState(false);
  const [ editorText , setEditorText ] = useState();
  const [ isThumbnail , setIsThumbnail ] = useState(false);
  const [form] = Form.useForm();
  return (
      <>
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
        <tr>
      <td 
      // colSpan={columns.length}
      >
        <Row gutter={[16, 16]} style={{ width: '100%' }}>
          <Col span={12}>
            { isAddDescription ?
              <CKEditor
              editor={ClassicEditor}
              data={editorText}
              onChange={(event ,editor) => {
                  const data = editor.getData();
                  setEditorText(data);
              }}
              />
              :
              <button onClick={() => setIsAddDescription(true)} className="qae-discount-btn">
              <PlusSquareOutlined
                style={{ color: 'rgb(115, 61, 217)', paddingRight: '8px', display: 'flex', alignItems: 'center' }}
                
                />
              Add Description
            </button>
            }
          </Col>
          <Col span={12}>
            { isThumbnail ?
              <SignatureUpload />
             :
              <button onClick={() => setIsThumbnail(true)} className="qae-discount-btn">
                <PictureOutlined
                  style={{ color: 'rgb(115, 61, 217)', paddingRight: '8px', display: 'flex', alignItems: 'center' }}
                  />
                Add Thumbnail
              </button>
            }
          </Col>
        </Row>
      </td>
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


const ItemTable = ({ setRate , setAmount , currencySymbol, isItemWiseDiscount, IWdiscount, discountType, getTotalRate }) => {
  const [ symbol , setSymbol ] = useState("₹");
  const [ itemRate , setItemRate ] = useState(1);
  const [ itemAmount , setItemAmount ] = useState(1);
  const [ totalRate , setTotalRate ] = useState(100);
  const [ totalAmount, setTotalAmount ] = useState(100);

  useEffect(() => {
    setSymbol(currencySymbol);
  },[currencySymbol]);
  
  const [dataSource, setDataSource] = useState([
    {
      key: '0',
      Item: 'Television',
      Quantity: '2',
      Rate: `${symbol} ${itemRate}`,
      Amount: `${symbol} ${itemAmount}`,
    }
  ]);

  useEffect(() => {
    const newDataSource = dataSource.map((item) => ({
      ...item,
      Discount: `${IWdiscount} ${discountType}`,
    }));
    setDataSource(newDataSource);

  },[IWdiscount,discountType]);

  console.log(dataSource);
    
  useEffect(() => {
    const calculateItemAmount = (item) => {
  
      let amount = item.Quantity * item.Rate.replace(/[^\d.]/g, '');
      setTotalRate(amount);
  
      if (isItemWiseDiscount) {
          const discount = item.Discount ? parseFloat(item.Discount.replace(/[^0-9.]/g, "")) : 0;
          console.log(discount);
          const discountAmount = amount * (discount / 100);
          amount -= discountAmount;
          setTotalAmount(amount);
      }
  
      console.log(amount);
  
      return amount;
    };
  
    const newDataSource = dataSource.map((item) => ({
      ...item,
      Amount: `${symbol} ${calculateItemAmount(item)}`,
      Rate: `${symbol} ${item.Rate.replace(/[^\d.]/g, '')}`,
    }));
  
    setDataSource(newDataSource);
  }, [ dataSource ]);

  useEffect(() => {
    let rateSum = 0;
    let amountSum = 0;

    dataSource.forEach((item) => {
      const rate = Number(item.Rate.replace(/[^\d.]/g, ''));
      const quantity = item.Quantity;
      const both = quantity * rate;
      rateSum += both;

      const amount = Number(item.Amount.replace(/[^\d.]/g, ''));
      amountSum += amount;
    });

    setTotalRate(rateSum);
    setTotalAmount(amountSum);
  
    getTotalRate(rateSum, amountSum);
  }, [dataSource, getTotalRate]);
  
  
  const [count, setCount] = useState(1);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns = [
    {
      title: 'Item',
      dataIndex: 'Item',
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
    ...(isItemWiseDiscount
      ? [
          {
            title: 'Discount',
            dataIndex: 'Discount',
            editable: true,
          },
        ]
      : []),
    {
      title: '',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
            <CloseOutlined onClick={() => handleDelete(record.key)} />
        ) : null,
    },
  ];

  console.log(isItemWiseDiscount);

  // if (isItemWiseDiscount) {
  //   defaultColumns.push({
  //     title: 'Discount',
  //     dataIndex: 'Discount',
  //     editable: true
  //   })
  // }

  const handleAdd = () => {

    if(isItemWiseDiscount){
      const newData = {
        key: count,
        Item: `Sample Item`,
        Quantity: '1',
        Rate: `${symbol} 1`,
        Amount: `${symbol} 1`,
        Discount: `${IWdiscount} ${discountType}`
      }
      setDataSource([...dataSource, newData]);
      setCount(count + 1);

    }else {
      const newData = {
        key: count,
        Item: `Sample Item`,
        Quantity: '1',
        Rate: `${symbol} 1`,
        Amount: `${symbol} 1`,
      };  
      setDataSource([...dataSource, newData]);
      setCount(count + 1);
    }
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
    
    // const amount = newData[0].Amount.replace(/\D/g, '');
    // setItemAmount(parseInt(amount)); 
  };
  console.log(itemAmount);

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

      <Row style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start"
      }}>
        <Col span={12}>
          <Button
            onClick={handleAdd}
            type="primary"
            style={{
              marginBottom: 16,
              width: "100%",
              padding: "0.5rem 1rem",
              height: "auto",
            }}
            icon={<PlusSquareOutlined />}
            className='qae-btn qae-dashed-btn'
            >
            Add new Line
          </Button>
        </Col>
      </Row>   
    </Space>
  );
};

export default ItemTable;
