import "./QuotationsAndEstimates.css";

import { Button, Checkbox, Col, Divider, Input, Modal, Row, Space } from 'antd';
import { CloseOutlined, DollarOutlined, EditOutlined, FieldNumberOutlined, MailOutlined, PaperClipOutlined, PercentageOutlined, PhoneOutlined, PlusSquareOutlined, TableOutlined, TagOutlined, UnorderedListOutlined } from "@ant-design/icons";

import AddMoreFields from "./subcomponents/AddMoreFields";
import AdditionalCharges from "./subcomponents/AdditionalCharges";
import AdditionalInfo from "./subcomponents/AdditionalInfo";
import BusinessDetails from "./subcomponents/BusinessDetails";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { DatePicker } from 'antd';
import DiscountOnTotal from "./subcomponents/DiscountOnTotal";
import GSTModal from "./subcomponents/GSTModal";
import ItemTable from './ItemTable';
import NumberFormat from "./subcomponents/NumberFormat";
import QuotationCurrency from "./QuotationCurrency";
import ShippingDetails from "./ShippingDetails";
import SignatureUpload from "./subcomponents/SignatureUpload";
import TermsAndCondition from "./subcomponents/TermsAndCondition";
import TotalInWords from "./subcomponents/TotalInWords";
import Upload from './subcomponents/Upload';
import dayjs from 'dayjs';
import parse from "html-react-parser";
import useItemWiseDiscount from "./subcomponents/ItemWiseDiscount";
import { useState } from "react";

const QuotationsAndEstimates = () => {
    const [ rate , setRate ] = useState();
    const [ amount , setAmount ] = useState();
    // const [ total , setTotal ] = useState(120);
    const [ currencySymbol , setCurrencySymbol ] = useState("₹");
    const [ totalRate, setTotalRate ] = useState(0);
    const [ totalAmount, setTotalAmount ] = useState(0);
    const [ reductionOnTotal , setReductionOnTotal ] = useState(0);
    const [ additionalCharges , setAdditionalCharges ] = useState(0);

    // const getItemWiseData = (IWdiscount, discountType) => {
    //     console.log(IWdiscount, discountType);
    // }
    const getTotalRate = (totalRate,totalAmount) => {
        setTotalRate(totalRate);
        setTotalAmount(totalAmount);
    }
    
    const getDiscountOnTotal = (valueText, keyText, discountType) => {
        console.log(valueText, keyText, discountType);
        setReductionOnTotal(keyText);
    }
    const getAdditionalCharges = (valueText, keyText, discountType) => {
        console.log(valueText, keyText, discountType);
        setAdditionalCharges(keyText);
    }

    
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

    const [ isItemWiseDiscount , setIsItemWiseDiscount ] = useState(false);
    const [ isDiscountOnTotal , setIsDiscountOnTotal ] = useState(false);
    const [ isAdditionalCharges , setIsAdditionalCharges] = useState(false);
    const [ hideTotals , setHideTotals ] = useState(false);
    const [ isTotalInWords , setIsTotalInWords ] = useState(false);
    const [ isAddMoreFields, setIsAddMoreFields ] = useState(false);
    
    const { render, IWdiscount, discountType } = useItemWiseDiscount({ setIsItemWiseDiscount });

    const onChange = (date, dateString) => {
        console.log(date, dateString);
        setInvoiceDate(date);
        console.log(invoiceDate);
    };
      
    let d = new Date();
    let date = `${d.getDate() < 9 ? '0' : ''}${d.getDate() + 1}/${d.getMonth() < 9 ? '0' : ''}${d.getMonth() + 1}/${d.getFullYear()}`;

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
                            <DatePicker 
                                onChange={onChange} 
                                className="qae-input-value" 
                                placeholder="Enter Quotation Date" 
                                defaultValue={dayjs(date , 'DD/MM/YYYY')}
                                label="Quotation Date" 
                                name="invoiceNumber" 
                                value={invoiceDate}
                            />
                        </div>
                </div>

               <AddMoreFields />
             </div>

             <div className="qae-logo-section">
                <div>Logo</div>
             </div>
             
            </div>

        <BusinessDetails />
        
        <div style={{width:"100%"}}>
            <Checkbox onChange={() => setIsShipping(!isShipping)} style={{paddingRight: '5px'}}/>Add Shipping Details
            { isShipping && <ShippingDetails /> }
        </div>
    
    <div style={{width:"100%",margin:'2rem 0 2rem'}}>

        <Row gutter={[16,16]}>
            <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
               <Button onClick={() => setIsGSTModalOpen(true)} className="qae-btn" type="primary" icon={<PercentageOutlined />}> Add GST </Button>
            </Col>
                <Modal title="Configure Tax" open={isGSTModalOpen} onOk={() => setIsGSTModalOpen(false)} onCancel={() => setIsGSTModalOpen(false)}>
                      <Divider />
                      <GSTModal />
                </Modal>

            <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6} style={{display:"flex",alignItems:"center"}}>
                <label>Currency </label>
                <span className="required" style={{paddingRight:'5px'}}>*</span>
                <QuotationCurrency setCurrencySymbol={setCurrencySymbol}/>
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

        <ItemTable 
            setAmount={setAmount} 
            setRate={setRate} 
            currencySymbol={currencySymbol}
            {...{IWdiscount, discountType}}
            isItemWiseDiscount={isItemWiseDiscount}
            getTotalRate={getTotalRate}
        />

        
        <Row gutter={[16,16]} style={{width:'100%',display:'flex',flexDirection:"column"}}>
            <Col xs={24} sm={24} offset={window.innerWidth > 576 ? 16 : 0}>
    
                { isItemWiseDiscount ?
                    { ...render }
                    :
                    <button onClick={() => setIsItemWiseDiscount(true)} className="qae-discount-btn">
                        <TagOutlined style={{ color: 'rgb(115, 61, 217)', paddingRight: '8px', display:'flex',alignItems:'center' }} />
                        Give Item wise Discount
                    </button>
                }

                { isItemWiseDiscount &&
                    <>
                    <div className="iwd-container">
                        <div style={{paddingBottom:"10px"}}>
                            <span style={{borderBottom:"1px solid gray",paddingBottom:"5px"}}>
                            SubTotal:
                            </span> 
                            <span className="iwd-sub" >{currencySymbol} {totalRate}</span>
                        </div>
                        <div>
                            <span style={{borderBottom:"1px solid gray",paddingBottom:"5px"}}>
                            Amount: 
                            </span>
                            <span className="iwd-sub" >{currencySymbol} {totalAmount}</span>
                        </div>
                    </div>
                    </>
                }

                { !hideTotals &&
                    <>
                        { isDiscountOnTotal ?
                            <DiscountOnTotal 
                                setIsDiscountOnTotal={setIsDiscountOnTotal} 
                                getDiscountOnTotal={getDiscountOnTotal}
                            />
                        : 
                        <button onClick={() => setIsDiscountOnTotal(true)} className="qae-discount-btn">
                                <PlusSquareOutlined style={{ color: 'rgb(115, 61, 217)', paddingRight: '8px', display:'flex',alignItems:'center' }} />
                                Give Discount on Total
                            </button>
                        }

                        { isAdditionalCharges ?
                            <AdditionalCharges 
                                setIsAdditionalCharges={setIsAdditionalCharges}
                                getAdditionCharges={getAdditionalCharges}
                            />
                            :
                            <button onClick={() => setIsAdditionalCharges(true)} className="qae-discount-btn">
                                <PlusSquareOutlined style={{ color: 'rgb(115, 61, 217)', paddingRight: '8px', display:'flex',alignItems:'center' }} />
                                Add Additional Charges
                            </button>
                        }
                    </>
                }      
                    <button onClick={() => setHideTotals(!hideTotals)} className="qae-discount-btn">
                        <DollarOutlined style={{ color: 'rgb(115, 61, 217)', paddingRight: '8px', display:'flex',alignItems:'center' }} />
                        {hideTotals ? "Show" : "Hide" } Totals
                    </button>


                    <button className="qae-discount-btn">
                        <Checkbox style={{ paddingRight: '8px' }} />
                        Summarise Total Quantity
                    </button>

                    <Divider />

                { !hideTotals &&
                    <>
                    <div className="qae-price">
                        <div className="qae-total-text">
                            Total (INR)
                        </div>
                        <div className="qae-total-price">
                        {isDiscountOnTotal && isAdditionalCharges && reductionOnTotal !== 0 && additionalCharges !== 0 ? `₹ ${Number(totalAmount) + Number(additionalCharges) - Number(reductionOnTotal)}` :
                            isDiscountOnTotal && reductionOnTotal !== 0 ? `₹ ${totalAmount - reductionOnTotal}` :
                            isAdditionalCharges && additionalCharges !== 0 ? `₹ ${Number(totalAmount) + Number(additionalCharges)}` :
                            `₹ ${totalAmount}`}
                        </div>

                    </div>
                    
                    <Divider />
                    { isTotalInWords ?
                        <TotalInWords 
                            total={isDiscountOnTotal && isAdditionalCharges && reductionOnTotal !== 0 && additionalCharges !== 0 ? `${Number(totalAmount) + Number(additionalCharges) - Number(reductionOnTotal)}` :
                            isDiscountOnTotal && reductionOnTotal !== 0 ? `${totalAmount - reductionOnTotal}` :
                            isAdditionalCharges && additionalCharges !== 0 ? `${Number(totalAmount) + Number(additionalCharges)}` :
                            `${totalAmount}`} 
                            setIsTotalInWords={setIsTotalInWords}        
                        />  

                     :   
                        <button onClick={() => setIsTotalInWords(true)} className="qae-discount-btn">
                        <DollarOutlined style={{ color: 'rgb(115, 61, 217)', paddingRight: '8px' , display:'flex',alignItems:'center'}} />
                        Show Total in Words
                    </button>
                    }

                    { isAddMoreFields ?
                        <AddMoreFields />
                        :
                        <button onClick={() => setIsAddMoreFields(true)} className="qae-discount-btn">
                            <PlusSquareOutlined style={{ color: 'rgb(115, 61, 217)', paddingRight: '8px' , display:'flex',alignItems:'center'}} />
                            Add More Fields
                        </button>
                    }

                    </>
                }

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