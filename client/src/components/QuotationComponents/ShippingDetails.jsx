import "./ShippingDetails.css";

import { Checkbox, Col, DatePicker, Row } from "antd";
import { CloseOutlined, PlusSquareOutlined } from "@ant-design/icons";

import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

const ShippingDetails = () => {
    const [ BbusinessName, setBBusinessName] = useState();
    const [ Bcountry, setBCountry] = useState();
    const [ Baddress, setBAddress] = useState();
    const [ Bcity, setBCity] = useState();
    const [ BpostalCode, setBPostalCode] = useState();
    const [ Bstate, setBState] = useState();

    const [ businessName, setBusinessName] = useState();
    const [ country, setCountry] = useState();
    const [ address, setAddress] = useState();
    const [ city, setCity] = useState();
    const [ postalCode, setPostalCode] = useState();
    const [ state, setState] = useState();

    const [ challanNoKey , setChallanNoKey ] = useState("Challan Number");
    const [ challanNo , setChallanNo ] = useState("");

    const [ challanDateKey , setChallanDateKey ] = useState("Challan Date");
    const [ challanDate , setChallanDate ] = useState("");

    const [ transportKey , setTransportKey ] = useState("Transport");
    const [ transport , setTransport ] = useState("");

    const [ extraInfoKey , setExtraInfoKey ] = useState("Extra Information");
    const [ extraInfo , setExtraInfo ] = useState("");

    const handleDateChange = (date, dateString) => {
        console.log(date, dateString);
        setChallanDate(date);
        console.log(challanDate);
      };

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

    
    const countries = ["America","Japan","London","Tokya","Italy"];
    return (
        <>
        <Row gutter={[16,16]} justify="flex-start" style={{margin:'1.5rem 0'}}>
        
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                <div className="qae-box1">
                    <div className="qae-head">
                        <div style={{ fontSize:'1.5rem'}}>Shipped From </div>
                    </div>

                    <div className="qae-contain" style={{marginTop:'10px'}}>
                        
                    <div className="qae-space">
                        <Checkbox style={{paddingRight: '5px'}}/> 
                        <span>Same as your business address</span>
                    </div>
                    
                    <div className="qae-box2">
                        <div className="qae-space">
                            <input
                            type="text"
                            name=""
                            placeholder="Business / Freelancer Name"
                            className="qae-label"
                            style={{width:"220px"}}
                            value={BbusinessName}
                            onChange={(e) => setBBusinessName(e.target.value)}
                            />
                        </div>
                        <div className="qae-space">
                            <select
                            name="countries"
                            placeholder="Select Country"
                            className="qae-label"
                            value={Bcountry}
                            onChange={(e) => setBCountry(e.target.value)}
                            >   
                                <option disabled selected>Select Country</option>
                                {countries.map((country) => <option value={country}>{country}</option>)}
                            </select>
                        </div>
                        <div className="qae-space">
                            <input
                            type="text"
                            name=""
                            placeholder="Address (optional)"
                            className="qae-label"
                            value={Baddress}
                            onChange={(e) => setBAddress(e.target.value)}
                            />
                        </div>

                        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                            <div className="qae-space">
                                <input
                                type="text"
                                name=""
                                placeholder="City (optional)"
                                className="qae-label"
                                style={{width:"120px",marginRight: "15px"}}
                                value={Bcity}
                                onChange={(e) => setBCity(e.target.value)}
                                />
                            </div>
                            <div className="qae-space">
                                <input
                                type="text"
                                name=""
                                placeholder="Postal Code / Zip Code (optional)"
                                className="qae-label"
                                style={{width:"100%"}}
                                value={BpostalCode}
                                onChange={(e) => setBPostalCode(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="qae-space">
                            <input
                            type="text"
                            name=""
                            placeholder="State (optional)"
                            className="qae-label"
                            value={Bstate}
                            onChange={(e) => setBState(e.target.value)}
                            />
                        </div>

                    </div>

                    </div>

                </div>
            </Col>
            
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                <div className="qae-box1">
                    <div className="qae-head">
                        <div style={{ fontSize:'1.5rem'}}>Shipped To </div>
                    </div>

                    <div className="qae-contain" style={{marginTop:'10px'}}>
                        
                    <div className="qae-space">
                        <Checkbox style={{paddingRight: '5px'}}/> 
                        <span>Same as client's address</span>
                    </div>
                    
                    <div className="qae-box2">
                        <div className="qae-space">
                            <input
                            type="text"
                            name=""
                            placeholder="Client's Business Name"
                            className="qae-label"
                            style={{width:"220px"}}
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            />
                        </div>
                        <div className="qae-space">
                            <select
                            name="countries"
                            placeholder="Select Country"
                            className="qae-label"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            >   
                                <option disabled selected>Select Country</option>
                                {countries.map((country) => <option value={country}>{country}</option>)}
                            </select>
                        </div>
                        <div className="qae-space">
                            <input
                            type="text"
                            name=""
                            placeholder="Address (optional)"
                            className="qae-label"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                            <div className="qae-space">
                                <input
                                type="text"
                                name=""
                                placeholder="City (optional)"
                                className="qae-label"
                                style={{width:"120px",marginRight: "15px"}}
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                />
                            </div>
                            <div className="qae-space">
                                <input
                                type="text"
                                name=""
                                placeholder="Postal Code / Zip Code (optional)"
                                className="qae-label"
                                style={{width:"100%"}}
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="qae-space">
                            <input
                            type="text"
                            name=""
                            placeholder="State (optional)"
                            className="qae-label"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            />
                        </div>

                    </div>


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

                    </div>

                </div>
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                <div className="qae-box1">
                    <div className="qae-head">
                        <div style={{ fontSize:'1.5rem'}}>Transport Details</div>
                    </div>
                    <div className="qae-contain" style={{marginTop:'10px'}}>
                    
                <div className="qae-details" >
                        <div className="qae-key">
                            <input
                            type="text"
                            name=""
                            placeholder="Field Name"
                            className="qae-label"
                            style={{width:"120px"}}
                            value={challanNoKey}
                            onChange={(e) => setChallanNoKey(e.target.value)}
                            />
                        </div>

                        <div className="qae-value">
                            <input className="qae-input-value" onChange={(e) => setChallanNo(e.target.value)} label="Challan Number" direction="row" autocomplete="off" placeholder="Challan Number (optional)" name="challanNo"  value={challanNo}></input>
                        </div>
                </div>
                <div className="qae-details" >
                        <div className="qae-key">
                            <input
                            type="text"
                            name=""
                            placeholder="Field Name"
                            className="qae-label"
                            style={{width:"120px"}}
                            value={challanDateKey}
                            onChange={(e) => setChallanDateKey(e.target.value)}
                            />
                        </div>

                        <div className="qae-value">
                            <DatePicker className="qae-input-value" onChange={handleDateChange} label="Challan Date" direction="row" autocomplete="off" placeholder="Challan Date (optional)" name="challanDate"  value={challanDate} />
                        </div>
                </div>
                <div className="qae-details" >
                        <div className="qae-key">
                            <input
                            type="text"
                            name=""
                            placeholder="Field Name"
                            className="qae-label"
                            style={{width:"120px"}}
                            value={transportKey}
                            onChange={(e) => setTransportKey(e.target.value)}
                            />
                        </div>

                        <div className="qae-value">
                            <input className="qae-input-value" onChange={(e) => setTransport(e.target.value)} label="Transport Name" direction="row" autocomplete="off" placeholder="Transport Name (optional)" name="transport"  value={transport}></input>
                        </div>
                </div>
                <div className="qae-details" >
                        <div className="qae-key">
                            <input
                            type="text"
                            name=""
                            placeholder="Field Name"
                            className="qae-label"
                            style={{width:"120px"}}
                            value={extraInfoKey}
                            onChange={(e) => setExtraInfoKey(e.target.value)}
                            />
                        </div>

                        <div className="qae-value">
                            <TextArea className="qae-input-value" onChange={(e) => setExtraInfo(e.target.value)} label="Extra Info" direction="row" autocomplete="off" placeholder="Shipping Note (optional)" name="extrainfo"  value={extraInfo} />
                        </div>
                </div>

                    </div>
                </div>
            </Col>

        </Row>
        </>
    )
}

export default ShippingDetails;