import "./QuotationsAndEstimates.css";

import { Button, Checkbox, Col, DatePicker, Divider, Modal, Row, Space } from 'antd';
import { CloseOutlined, DollarOutlined, EditOutlined, FieldNumberOutlined, PaperClipOutlined, PercentageOutlined, PhoneOutlined, PlusSquareOutlined, TagOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

import BusinessDetails from "./subcomponents/BusinessDetails";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ItemTable from './ItemTable';
import axios from "axios";
import dayjs from 'dayjs';
import useAdditionalCharges from "./subcomponents/AdditionalCharges";
import useAdditionalInfo from "./subcomponents/AdditionalInfo";
import useClientAddress from './subcomponents/ClientAddress';
import useClientName from "./subcomponents/ClientName";
import useContactInfo from "./subcomponents/ContactInfo";
import useDiscountOnTotal from "./subcomponents/DiscountOnTotal";
import useGSTModal from "./subcomponents/GSTModal";
import useItemWiseDiscount from "./subcomponents/ItemWiseDiscount";
import useNumberFormat from "./subcomponents/NumberFormat";
import useQBAddMoreFields from "./subcomponents/QBAddMoreFields";
import useQTAddMoreFields from "./subcomponents/QTAddMoreFields";
import useQuotationCurrency from "./QuotationCurrency";
import useSelectAddress from "./subcomponents/SelectAddress";
import useSelectBusiness from "./subcomponents/SelectBusiness";
import useTermsAndCondition from "./subcomponents/TermsAndCondition";
import useTotalInWords from "./subcomponents/TotalInWords";
import useUploadAttachments from './subcomponents/UploadAttachments';
import useUploadSignature from "./subcomponents/UploadSignature";

const QuotationsAndEstimates = () => {
    const [ tableItems, setTableItems ] = useState();
    const [ totalRate, setTotalRate ] = useState(0);
    const [ totalAmount, setTotalAmount ] = useState(0);
    const [ total , setTotal ] = useState(0);
    
    const getTotalRateAndAmount = (totalRate,totalAmount) => {
        setTotalRate(totalRate);
        setTotalAmount(totalAmount);
    }
    
    const [ invoiceNo, setInvoiceNo] = useState("A00001");
    const [ invoiceNoKey, setInvoiceNoKey] = useState("Quotation No");

    const [ invoiceDate, setInvoiceDate ] = useState("22/05/2023");
    const [ invoiceDateKey, setInvoiceDateKey ] = useState("Quotation Date");

    // const [ isShipping, setIsShipping] = useState(false);
    const [isGSTModalOpen, setIsGSTModalOpen] = useState(false);
    const [isNumberFormatModalOpen, setIsNumberFormatModalOpen] = useState(false);
    const [ isTermsAndCond , setIsTermsAndCond ] = useState(false);
    const [ isNotes , setIsNotes ] = useState(false);
    const [ editorText , setEditorText ] = useState();
    const [ isAttachment, setIsAttachment ] = useState(false);
    const [ isSignature , setIsSignature ] = useState(false);
    const [ isAdditionalInfo , setIsAdditionalInfo ] = useState(false);
    const [ isContact , setIsContact ] = useState(false);

    const [ isItemWiseDiscount , setIsItemWiseDiscount ] = useState(false);
    const [ isDiscountOnTotal , setIsDiscountOnTotal ] = useState(false);
    const [ isAdditionalCharges , setIsAdditionalCharges] = useState(false);
    const [ hideTotals , setHideTotals ] = useState(false);
    const [ isTotalInWords , setIsTotalInWords ] = useState(false);
    
    const { render: SelectAddressRender , selectedAddress : address } = useSelectAddress();
    const { render: SelectBusinessRender , selectedBusiness : businessName } = useSelectBusiness();
    const { render: ClientNameRender , selectedClient : clientName } = useClientName();
    const { render: ClientAddressRender , selectedAddress : clientAddress } = useClientAddress();

    const { render : ItemWiseDiscountRender, IWdiscount, discountType : IWdiscountType } = useItemWiseDiscount({ setIsItemWiseDiscount });
    const { render : GSTModalRender, value: gstType , selectedValue: taxType } = useGSTModal();
    const { render : CurrencyRender, currency, symbol: currencySymbol } = useQuotationCurrency();
    const { render : NumberFormatRender, numberSystem , decimalPlaces } = useNumberFormat();
    const { render : DiscountOnTotalRender, valuetext: reductionText, keyText: reductionOnTotal, discountType : reductionDiscountType} = useDiscountOnTotal({ setIsDiscountOnTotal });
    const { render : AdditionalChargesRender, valueText : additionalChargesText, keyText : additionalCharges, discountType : additionalChargesType} = useAdditionalCharges({ setIsAdditionalCharges });
    const { render : TotalInWordsRender , amountInWords } = useTotalInWords({ total: total ,setIsTotalInWords });
    const { render : TermsAndConditionRender , terms } = useTermsAndCondition();
    const { render : UploadAttachmentsRender , uploadedAttachment } = useUploadAttachments();
    const { render : UploadSignatureRender , uploadedSignature , signatureLabel} = useUploadSignature();
    const { render : AdditionalInfoRender , fields : additionalInfo } = useAdditionalInfo();
    const { render : QBAddMoreFieldsRender , fields : QBFields } = useQBAddMoreFields();
    const { render : QTAddMoreFieldsRender , fields : QTFields } = useQTAddMoreFields();
    const { render : ContactInfoRender , email, phone } = useContactInfo({ setIsContact });
      
    // console.log( uploadedSignature , signatureLabel );
    console.log(uploadedAttachment);


    const saveQuotation = () => {
        const postData = async () => {
            const data = {
                quotation_no : invoiceNo,
                quotation_date: invoiceDate,
                q_top_add_more_field: QTFields,
                business_details: {
                    your_business: {
                    name: businessName,
                    address: address
                    },
                    client: {
                    name: clientName,
                    address: clientAddress
                    }
                },
                gst: {
                    tax_type: taxType,
                    gst_type: gstType
                },
                currency: {
                    short_form: currency,
                    symbol: currencySymbol
                },
                number_format: {
                    format: numberSystem,
                    decimal_digits: decimalPlaces
                },
                table: tableItems,
                item_wise_discount: {
                    discount : {
                    discount_value: IWdiscount,
                    discount_type: IWdiscountType
                    },
                    subtotal: totalRate,
                    amount: totalAmount
                },
                hideTotals: {
                    discount_on_total: {
                        field: reductionText,
                        value: reductionOnTotal,
                        discount_type : reductionDiscountType
                    },
                    additional_charges: {
                        field: additionalChargesText,
                        value: additionalCharges,
                        discount_type: additionalChargesType
                    },
                    total : total,
                    total_in_words: amountInWords
                },
                q_bottom_add_more_field: QBFields,
                terms_and_conditions: terms,
                notes: editorText,
                // attachments: [{
                //     file: uploadedAttachment
                // }],
                // signature: {
                //     file: uploadedSignature,
                //     label: signatureLabel
                // },
                additional_info: additionalInfo,
                contact_info: {
                    email: email,
                    phone: phone
                }
              };
            try {
              await axios.post('http://localhost:3001/new/quotation', data, {
                headers: {
                  'Content-Type': 'application/json'
                }
              });
            
            console.log("Succesfully posted!");
            
        } catch (error) {
            console.log(error);
            console.log("Error!");
            }
          }
          
        postData();    
      };

      const calculateTotalAmount = () => {
        let calculatedTotalAmount = Number(totalAmount);
    
        if (isDiscountOnTotal && reductionOnTotal !== 0) {
          calculatedTotalAmount -= Number(reductionOnTotal);
        }
    
        if (isAdditionalCharges && additionalCharges !== 0) {
          calculatedTotalAmount += Number(additionalCharges);
        }
    
        return calculatedTotalAmount;
      };
    
      useEffect(() => {
        const result = calculateTotalAmount();
        setTotal(result);
      }, [reductionOnTotal, isDiscountOnTotal, additionalCharges, isAdditionalCharges]);

      
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
                                className="qae-input-value"
                                
                            />
                        </div>
                </div>

               { QTAddMoreFieldsRender }
             </div>

             <div className="qae-logo-section">
                <div>Logo</div>
             </div>
             
            </div>

        <BusinessDetails 
            { ...{SelectAddressRender , address}} 
            { ...{SelectBusinessRender , businessName}}  
            { ...{ClientNameRender , clientName}}  
            { ...{ClientAddressRender , clientAddress}}  
        />   


        {/* SHIPPING DETAILS  */}
        {/* <div style={{width:"100%"}}>
            <Checkbox onChange={() => setIsShipping(!isShipping)} style={{paddingRight: '5px'}}/>Add Shipping Details
            { isShipping && <ShippingDetails /> }
        </div> */}
    
    <div style={{width:"100%",margin:'2rem 0 2rem'}}>

        <Row gutter={[16,16]}>
            <Col xs={24} sm={12} md={12} lg={6} xl={8} xxl={8}>
               <Button onClick={() => setIsGSTModalOpen(true)} className="qae-btn" type="primary" icon={<PercentageOutlined />}> Add GST </Button>
            </Col>
                <Modal title="Configure Tax" open={isGSTModalOpen} onOk={() => setIsGSTModalOpen(false)} onCancel={() => setIsGSTModalOpen(false)}>
                      <Divider />
                        {/* eslint-disable-next-line no-undef */}
                      { GSTModalRender }
                </Modal>

            <Col xs={24} sm={12} md={12} lg={6} xl={8} xxl={8} style={{display:"flex",alignItems:"center"}}>
                <label>Currency </label>
                <span className="required" style={{paddingRight:'5px'}}>*</span>
                { CurrencyRender }
            </Col>
        
            <Col xs={24} sm={12} md={12} lg={6} xl={8} xxl={8}>
                <Button onClick={() => setIsNumberFormatModalOpen(true)} type="primary" className="qae-btn" icon={<FieldNumberOutlined />}> 123 Change Number Format </Button>
            </Col>
                <Modal title="Change Number Format" open={isNumberFormatModalOpen} onOk={() => setIsNumberFormatModalOpen(false)} onCancel={() => setIsNumberFormatModalOpen(false)}>
                    <Divider />
                    { NumberFormatRender }
                </Modal>

            {/* <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
                <Button type="primary" className="qae-btn" icon={<TableOutlined />}>Rename / Add Fields</Button>
            </Col> */}
            
        </Row>
    </div>

        <ItemTable 
            setTableItems={setTableItems}
            currencySymbol={currencySymbol}
            {...{IWdiscount, IWdiscountType}}
            isItemWiseDiscount={isItemWiseDiscount}
            getTotalRateAndAmount={getTotalRateAndAmount}
        />

        
        <Row gutter={[16,16]} style={{width:'100%',display:'flex',flexDirection:"column"}}>
            <Col xs={24} sm={24} offset={window.innerWidth > 576 ? 16 : 0}>
    
                { isItemWiseDiscount ?
                    { ...ItemWiseDiscountRender }
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
                            { ...DiscountOnTotalRender }
                        : 
                        <button onClick={() => setIsDiscountOnTotal(true)} className="qae-discount-btn">
                                <PlusSquareOutlined style={{ color: 'rgb(115, 61, 217)', paddingRight: '8px', display:'flex',alignItems:'center' }} />
                                Give Discount on Total
                            </button>
                        }

                        { isAdditionalCharges ?
                            { ...AdditionalChargesRender }
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
                            Total ({currency})
                        </div>
                        <div className="qae-total-price">
                            { currencySymbol }
                            { total === 0 ? totalAmount : total }
                        </div>

                    </div>
                    
                    <Divider />
                    { isTotalInWords ?
                
                        { ...TotalInWordsRender }  

                     :   
                        <button onClick={() => setIsTotalInWords(true)} className="qae-discount-btn">
                        <DollarOutlined style={{ color: 'rgb(115, 61, 217)', paddingRight: '8px' , display:'flex',alignItems:'center'}} />
                        Show Total in Words
                    </button>
                    }

                        { QBAddMoreFieldsRender }
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
                    { TermsAndConditionRender }              
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
                    { UploadAttachmentsRender }              
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
                    { UploadSignatureRender }
                    
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
                    { AdditionalInfoRender }
                    
                </div>
                </>
            }
            
            { isContact && { ...ContactInfoRender } }
        </Space>

            <Row gutter={[16,16]} style={{marginTop:"3rem"}}>
                <Col>
                    <Button  type="primary" style={{background:"#fefefe",color:"black",border: "1px solid #C6D2D9", padding: "0.8rem 1rem", width:"fit-content",height:"auto"}}>Save as Draft</Button>
                </Col>
                <Col>
                    <Button onClick={saveQuotation} type="primary" style={{background:"rgb(222,23,94)",color:"white", padding: "0.8rem 1rem", width:"fit-content",height:"auto"}}>Save & Continue</Button>
                </Col>
            </Row>

            </div>
        </>
    )
}

export default QuotationsAndEstimates;