import "./QuotationsAndEstimates.css";

import { Button, Checkbox, Col, Divider, Input, InputNumber, Modal, Row, Space } from 'antd';
import { CloseOutlined, DollarOutlined, EditOutlined, FieldNumberOutlined, MailOutlined, PaperClipOutlined, PercentageOutlined, PhoneOutlined, PlusSquareOutlined, TableOutlined, TagOutlined, UnorderedListOutlined } from "@ant-design/icons";

import AdditionalInfo from "./subcomponents/AdditionalInfo";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { DatePicker } from 'antd';
import GSTModal from "./subcomponents/GSTModal";
import ItemTable from './ItemTable';
import NumberFormat from "./subcomponents/NumberFormat";
import QuotationCurrency from "./QuotationCurrency";
import SelectBusiness from './SelectBusiness';
import ShippingDetails from "./ShippingDetails";
import SignatureUpload from "./subcomponents/SignatureUpload";
import TermsAndCondition from "./subcomponents/TermsAndCondition";
import Upload from './subcomponents/Upload';
import parse from "html-react-parser";
import { useState } from "react";

const QuotationsAndEstimates = () => {
    
    const [ invoiceNo, setInvoiceNo] = useState("A00001");
    const [ invoiceNoKey, setInvoiceNoKey] = useState("Quotation No");

    const [ invoiceDate, setInvoiceDate ] = useState();
    const [ invoiceDateKey, setInvoiceDateKey ] = useState("Quotation Date");

    const [ isShipping, setIsShipping] = useState(false);
    const [isGSTModalOpen, setIsGSTModalOpen] = useState(false);
    const [isNumberFormatModalOpen, setIsNumberFormatModalOpen] = useState(false);
    const [ isTermsAndCond , setIsTermsAndCond ] = useState(false);
    const [ isNotes , setIsNotes ] = useState(false);
    const [ editorText , setEditorText ] = useState();
    const [ isAttachment, setIsAttachment ] = useState(false);
    const [ isSignature , setIsSignature ] = useState(false);
    const [ addSignatureLabel, setAddSignatureLabel] = useState(true);
    const [ isAdditionalInfo , setIsAdditionalInfo ] = useState(false);
    const [ isContact , setIsContact ] = useState(false);

    const onChange = (date, dateString) => {
        console.log(date, dateString);
        setInvoiceDate(date);
        console.log(invoiceDate);
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

      
    const showGSTModal = () => {
        setIsGSTModalOpen(true);
      };
      const handleGSTOk = () => {
        setIsGSTModalOpen(false);
      };
      const handleGSTCancel = () => {
        setIsGSTModalOpen(false);
      };


    return (
        <>
            <div className="qae-container">
                <div className="qae-heading">
                    Quotation
                </div> 

            <div className="qae-top">


             <div className="qae-detail-section">

                <div className="qae-details">
                        <div className="qae-key">
                            <input
                            type="text"
                            name=""
                            placeholder="Field Name"
                            className="qae-label"
                            style={{width:"120px"}}
                            value={invoiceNoKey}
                            onChange={(e) => setInvoiceNoKey(e.target.value)}
                            />
                            <span class="required">*</span>
                        </div>

                        <div className="qae-value">
                            <input className="qae-input-value" onChange={(e) => setInvoiceNo(e.target.value)} label="Quotation No" direction="row" autocomplete="off" placeholder="Enter Quotation No" name="invoiceNumber"  value={invoiceNo}></input>
                        </div>
                </div>

                <div className="qae-details">
                        <div className="qae-key">
                            <input
                            type="text"
                            name=""
                            placeholder="Field Name"
                            className="qae-label"
                            style={{width:"120px"}}
                            value={invoiceDateKey}
                            onChange={(e) => setInvoiceDateKey(e.target.value)}
                            />
                            <span class="required">*</span>
                        </div>

                        <div className="qae-value">
                            <DatePicker onChange={onChange} className="qae-input-value" placeholder="Enter Quotation Date" label="Quotation Date" name="invoiceNumber" value={invoiceDate}/>
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

             </div>

             <div className="qae-logo-section">
                <div>Logo</div>
             </div>
             
            </div>

        
        <Row gutter={[16,16]} style={{marginBottom:'2rem'}}>
            <Col flex="1">
                <div className="qae-box1">
                    <div className="qae-head">
                        <div style={{padding:"5px", fontSize:'1.5rem'}}>Quotation Form</div>
                        <span>(Your Details)</span>
                    </div>

                    <SelectBusiness style={{margin:'10px 0'}} />
                
                    <div className="qae-container" style={{marginTop:'10px'}}>

                        <div className="qae-business-details"> Business details
                        
                            <div className="qae-business" style={{marginTop:'0.7rem'}}>
                                <div className="qae-input-add" >Business Name</div>
                                <div className="qae-input-val-add">Prishav Technologies</div>
                            </div>
                            <div className="qae-business">
                                <div className="qae-input-add" >Address</div>
                                <div className="qae-input-val-add">SRA 51 A Shipra Rivera, indirapuram, Uttar Pradesh, India 201014</div>
                            </div>

                        </div>

                    </div>

                </div>
            </Col>

            <Col flex="1">
                <div className="qae-box1">
                    <div className="qae-head">
                        <div style={{padding:"5px", fontSize:'1.5rem'}}>Quotation Form</div>
                        <span>(Your Details)</span>
                    </div>

                    <SelectBusiness style={{margin:'10px 0'}} />
                
                    <div className="qae-container" style={{marginTop:'10px'}}>

                        <div className="qae-business-details"> Business details
                        
                            <div className="qae-business" style={{marginTop:'0.7rem'}}>
                                <div className="qae-input" >Business Name</div>
                                <div className="qae-input-val">Prishav Technologies</div>
                            </div>

                            <div className="qae-business">
                                <div className="qae-input-add" >Address</div>
                                <div className="qae-input-val-add" >SRA 51 A Shipra Rivera, indirapuram, Uttar Pradesh, India 201014</div>
                            </div>

                        </div>

                    </div>

                </div>
            </Col>

        </Row>
        
        <div style={{width:"100%"}}>
            <Checkbox onChange={() => setIsShipping(!isShipping)} style={{paddingRight: '5px'}}/>Add Shipping Details
            { isShipping && <ShippingDetails /> }
        </div>
    
    <div style={{width:"100%",margin:'2rem 0 2rem'}}>

        <Row gutter={[16,16]}>
            <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
               <Button onClick={showGSTModal} className="qae-btn" type="primary" icon={<PercentageOutlined />}> Add GST </Button>
            </Col>
                <Modal title="Configure Tax" open={isGSTModalOpen} onOk={handleGSTOk} onCancel={handleGSTCancel}>
                      <Divider />
                      <GSTModal />
                </Modal>

            <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6} style={{display:"flex",alignItems:"center"}}>
                <label>Currency </label>
                <span className="required" style={{paddingRight:'5px'}}>*</span>
                <QuotationCurrency />
            </Col>
        
            <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
                <Button onClick={() => setIsNumberFormatModalOpen(true)} type="primary" className="qae-btn" icon={<FieldNumberOutlined />}> 123 Change Number Format </Button>
            </Col>
                <Modal title="Change Number Format" open={isNumberFormatModalOpen} onOk={() => setIsNumberFormatModalOpen(false)} onCancel={() => setIsNumberFormatModalOpen(false)}>
                    <Divider />
                    <NumberFormat />  
                </Modal>

            <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
                <Button type="primary" className="qae-btn" icon={<TableOutlined />}>Rename / Add Fields</Button>
            </Col>
            
        </Row>
    </div>

        <ItemTable />

        
        <Row gutter={[16,16]} style={{width:'100%',display:'flex',flexDirection:"column"}}>
            <Col xs={24} sm={24} offset={window.innerWidth > 576 ? 16 : 0}>
                    <button className="qae-discount-btn">
                        <TagOutlined style={{ color: 'rgb(115, 61, 217)', paddingRight: '8px', display:'flex',alignItems:'center' }} />
                        Give Item wise Discount
                    </button>

                    <button className="qae-discount-btn">
                        <PlusSquareOutlined style={{ color: 'rgb(115, 61, 217)', paddingRight: '8px', display:'flex',alignItems:'center' }} />
                        Give Discount on Total
                    </button>

                    <button className="qae-discount-btn">
                        <PlusSquareOutlined style={{ color: 'rgb(115, 61, 217)', paddingRight: '8px', display:'flex',alignItems:'center' }} />
                        Add Additional Charges
                    </button>
                    
                    <button className="qae-discount-btn">
                        <DollarOutlined style={{ color: 'rgb(115, 61, 217)', paddingRight: '8px', display:'flex',alignItems:'center' }} />
                        Hide Totals
                    </button>

                    <button className="qae-discount-btn">
                        <Checkbox style={{ paddingRight: '8px' }} />
                        Summarise Total Quantity
                    </button>

                    <Divider />

                    <div className="qae-price">
                        <div className="qae-total-text">
                            Total (INR)
                        </div>
                        <div className="qae-total-price">
                            ₹ 1
                        </div>

                    </div>
                    
                    <Divider />

                    <button className="qae-discount-btn">
                        <DollarOutlined style={{ color: 'rgb(115, 61, 217)', paddingRight: '8px' , display:'flex',alignItems:'center'}} />
                        Show Total in Words
                    </button>

                    <button className="qae-discount-btn">
                        <PlusSquareOutlined style={{ color: 'rgb(115, 61, 217)', paddingRight: '8px' , display:'flex',alignItems:'center'}} />
                        Add More Fields
                    </button>

            </Col>
        </Row>

        <Space  direction="vertical"
            size="middle"
            style={{
            display: 'flex',
            width: "100%"
            }}>

            <Row gutter={[16,16]} style={{width: '100%'}}>
                <Col xs={24} sm={24} md={8} lg={6} xl={6} >
                    <Button onClick={() => setIsTermsAndCond(true)} type="primary" className="qae-btn qae-dashed-btn" icon={<PlusSquareOutlined />}>Add Terms & Conditions</Button>
                </Col>

                <Col xs={24} sm={24} md={8} lg={6} xl={6} >
                    <Button onClick={() => setIsNotes(true)} type="primary" className="qae-btn qae-dashed-btn" icon={<UnorderedListOutlined />} >Add Notes</Button>
                </Col>

                <Col xs={24} sm={24} md={8} lg={6} xl={6} >
                    <Button onClick={() => setIsAttachment(true)} type="primary" className="qae-btn qae-dashed-btn" icon={<PaperClipOutlined />}>Add Attachments</Button>
                </Col>

                <Col xs={24} sm={24} md={8} lg={6} xl={6} >
                    <Button onClick={() => setIsSignature(true)} type="primary" className="qae-btn qae-dashed-btn" icon={<EditOutlined />}>Add Signature</Button>
                </Col>
            </Row>

            <Row gutter={[16,16]} style={{width: '100%'}}>  
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                    <Button onClick={() => setIsAdditionalInfo(true)} type="primary" className="qae-btn qae-dashed-btn" icon={<UnorderedListOutlined />} >Add Additional Info</Button>
                </Col>

                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                    <Button onClick={() => setIsContact(true)} type="primary" className="qae-btn qae-dashed-btn" icon={<PhoneOutlined /> } >Add Contact Details</Button>
                </Col>
            </Row>

            { isTermsAndCond && 
                <>
                <div className="n-notes">
                    <div className="n-top-desc">Terms & Conditions
                        <CloseOutlined onClick={() => setIsTermsAndCond(false)}/>
                    </div>
                    <TermsAndCondition />                
                </div>
                </>
            }

            { isNotes && 
                <>
                <div className="n-notes">
                    <div className="n-top-desc">Additional Notes
                        <CloseOutlined onClick={() => setIsNotes(false)}/>
                    </div>
                    <CKEditor
                    editor={ClassicEditor}
                    data={editorText}
                    onChange={(event ,editor) => {
                        const data = editor.getData();
                        setEditorText(data);
                    }}
                    />
                </div>
                </>
            }

            { isAttachment && 
                <>
                <div className="n-notes">
                    <div className="n-top-desc">Attachments
                        <CloseOutlined onClick={() => setIsAttachment(false)}/>
                    </div>
                    <Upload />                  
                </div>
                </>
            }
            

            { isSignature && 
                <>
                <div class='s-box'>
                <div className="n-notes" style={{width:"50%"}}>
                    <div className="n-top-desc">Signature
                        <CloseOutlined onClick={() => setIsSignature(false)}/>
                    </div>
                    <SignatureUpload />
                    { addSignatureLabel ?
                        <>  
                            <div className="n-top-desc" style={{paddingBottom: '0.5rem'}}>Add Signature Label
                                <CloseOutlined onClick={() => setAddSignatureLabel(false)}/>
                            </div>
                            <Input placeholder="Add your Name" defaultValue="Authorized Signature" />
                        </>
                    :
                        <div class='s-sig-label' onClick={() => setAddSignatureLabel(true)}>
                            <PlusSquareOutlined style={{ color: 'rgb(115, 61, 217)', paddingRight: '8px', display:'flex',alignItems:'center' }} />
                            Add Signature Label
                        </div>
                    }
                    
                    
                </div>
                </div>
                </>
            }
            { isAdditionalInfo && 
                <>
                <div className="n-notes" style={{width:"50%"}}>
                    <div className="n-top-desc">Add Additional Info
                        <CloseOutlined onClick={() => setIsAdditionalInfo(false)}/>
                    </div>
                    <AdditionalInfo />
                    
                </div>
                </>
            }
            
            { isContact && 
                <>
                <div className="n-notes">
                    <div className="n-top-desc">Your Contact Details
                        <CloseOutlined onClick={() => setIsContact(false)}/>
                    </div>
                    <div className="contact-box">
                        <Input defaultValue="For any enquiry, reach out via"  />
                        <Input defaultValue="email at"  />
                        <Input type="email" placeholder="Your email (optional)" prefix={<MailOutlined />} />
                        <Input defaultValue="call on" />
                        <Input placeholder="+91-XXXXXXXXXX" prefix={<PhoneOutlined />} />
                    </div>
                </div>
                </>
            }
        </Space>


            <Row gutter={[16,16]} style={{marginTop:"3rem"}}>
                <Col>
                    <Button type="primary" style={{background:"#fefefe",color:"black",border: "1px solid #C6D2D9", padding: "0.8rem 1rem", width:"fit-content",height:"auto"}}>Save as Draft</Button>
                </Col>
                <Col>
                    <Button type="primary" style={{background:"rgb(222,23,94)",color:"white", padding: "0.8rem 1rem", width:"fit-content",height:"auto"}}>Save & Continue</Button>
                </Col>
            </Row>


        
            </div>
        </>
    )
}

export default QuotationsAndEstimates;