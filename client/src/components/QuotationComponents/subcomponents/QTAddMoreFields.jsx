import { CloseOutlined, PlusSquareOutlined } from "@ant-design/icons";

import { useState } from "react";

function useQTAddMoreFields() {
    const [fields, setFields] = useState([]);

      const addNewField = () => {
        const newField = { fieldName: '', value: '' };
        setFields([...fields, newField]);
      };
    
      const deleteField = (index) => {
        const updatedFields = [...fields];
        updatedFields.splice(index, 1);
        setFields(updatedFields);
      };
    
      const updateFieldName = (index, fieldName) => {
        const updatedFields = [...fields];
        updatedFields[index].fieldName = fieldName;
        setFields(updatedFields);
      };
    
      const updateFieldValue = (index, value) => {
        const updatedFields = [...fields];
        updatedFields[index].value = value;
        setFields(updatedFields);
      };

    return {
      fields,
      render: (
        <>
         <div>
            {fields.map((field, index) => (
                <div className="qae-details" key={index}>
                <div className="qae-key" style={{ display: 'flex' }}>
                    <input
                    type="text"
                    name=""
                    placeholder="Field Name"
                    className="qae-label"
                    style={{width:"120px"}}
                    value={field.fieldName}
                    onChange={(e) => updateFieldName(index, e.target.value)}
                    />
                    <span className="required">*</span>
                </div>
                <div className="qae-value">
                    <input
                    className="qae-input-value"
                    label="Quotation No"
                    direction="row"
                    autoComplete="off"
                    placeholder="Value"
                    name="invoiceNumber"
                    value={field.value}
                    onChange={(e) => updateFieldValue(index, e.target.value)}
                    />
                </div>
                <div className="qae-cross">
                    <CloseOutlined onClick={() => deleteField(index)} style={{ color: 'rgb(115, 61, 217)'}} />
                </div>
                </div>
            ))}
            <button className="cs-discount-btn" onClick={addNewField}>
                <PlusSquareOutlined style={{ color: 'rgb(115, 61, 217)', paddingRight: '5px' }} />
                Add more Fields
            </button>
            </div>
        </>
    )
};
};

export default useQTAddMoreFields;