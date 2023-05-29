import './PrintQuotation.css';

import { useEffect, useState } from 'react';

import axios from 'axios';
import parse from "html-react-parser";

function PrintOuotation(){
    const [ data , setData ] = useState();
    const [ symbol , setSymbol ] = useState();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:3001/quotation');
            const quotationData = response.data;
            
            console.log(quotationData[3]);
            setData(quotationData[3]);
            setSymbol(quotationData[3].currency.symbol);
            
            console.log("Quotation data retrieved successfully!");
          } catch (error) {
            console.log(error);
            console.log("Error retrieving quotation data!");
          }
        };
        fetchData();
    }, []);

    if (!data) {
        return <div>Loading...</div>; 
    }
          
    return (
        <>
            <div className="q-container">
                
                <div className="q-top-wrapper">

                    <div className="q-heading"> 
                        <h1> Quotation </h1>
                    </div>

                    <div className="q-header">

                        <div className="q-no-date">
                            <div className="q-no-date-wrapper">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th className='q-hash-table'>
                                                Quotation No #
                                            </th>
                                            <td className='q-td'>{data?.quotation_no}</td>
                                        </tr>
                                        <tr>
                                            <th className='q-hash-table'>
                                                Quotation Date 
                                            </th>
                                            <td className='q-td'>{data?.quotation_date}</td>
                                        </tr>
                                            {data.q_top_add_more_field.map((item) => {
                                                return (
                                                    <> 
                                                    <tr>
                                                        <th className='q-hash-table'>{item.fieldName}</th>
                                                        <td className='q-td'>{item.value}</td>
                                                    </tr>
                                                    </>
                                                )
                                            })}
                                    </tbody>
                                </table>
                            </div>
                            
                        </div>

                        <div className="q-logo">
                            Logo
                        </div>

                    </div>

                </div>

                <div className="q-box">
                    <div className="q-box-wrapper">
                        <div className="q-from">
                            <div className="q-box-head">Quotation From</div>
                            <div className="q-box-company">{data?.business_details.your_business.name}</div>
                            <div className="q-box-address">{data?.business_details.your_business.address}</div>
                        </div>
                    </div>

                    <div className="q-box-wrapper">
                        <div className="q-to">
                            <div className="q-box-head">Quotation To</div>
                            <div className="q-box-company">{data?.business_details.client.name}</div>
                            <div className="q-box-address">{data?.business_details.client.address}</div>
                        </div>
                    </div>

                </div>


                <div className="q-table">
                    <div>
                        <table className="invoice-table invoice-items-table">
                            <thead>
                                <tr>
                                    <th style={{width: "10px"}} aria-label="Item Number"></th>
                                    <th style={{width: "250px"}}>Item</th>
                                    <th>Quantity</th>
                                    <th>Rate</th>
                                    <th>Discount</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data?.table.map((item, index) => {
                                    return (
                                        <tr key={item.key}>
                                            <td>{index + 1}.</td>
                                            <td>{item.Item}</td>
                                            <td>{item.Quantity}</td>
                                            <td>{item.Rate}</td>
                                            <td>{item.Discount}</td>
                                            <td>{item.Amount}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='q-bank-total-wrapper'>
                    <div className="q-bank-words-wrapper">
                        <div className="q-bank-words">
                            <p>
                                <span>Total (in words) :</span>
                                <span className="invoice-total-in-words">{data?.hideTotals.total_in_words}</span>
                            </p>
                        </div>
                    </div>
                    
                    <div className="q-total-sig-wrapper">
                        <table className="invoice-table">
                            <tbody>
                                <tr>
                                    <th>Sub Total</th>
                                    <td>{symbol} {data?.item_wise_discount.subtotal}</td>
                                </tr>
                                <tr>
                                    <th>Discount</th>
                                    <td>{symbol} {data?.item_wise_discount.subtotal - data?.item_wise_discount.amount}</td>
                                </tr>
                                <tr>
                                    <th>Reductions</th>
                                    <td>{symbol} {data?.hideTotals.discount_on_total.value}</td>
                                </tr>
                                <tr>
                                    <th>{data?.hideTotals.additional_charges.key}</th>
                                    <td>{symbol} {data?.hideTotals.additional_charges.value}</td>
                                </tr>
                                    {data.q_bottom_add_more_field.map((item) => {
                                        return (
                                            <> 
                                            <tr>
                                                <th>{item.fieldName}</th>
                                                <td>{item.value}</td>
                                            </tr>
                                            </>
                                        )
                                    })}
                                <tr>
                                    <th>Total ({data?.currency?.short_form})</th>
                                    <td>{symbol} {data?.hideTotals.total}</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <div className='q-logo-wrapper'>
                            <img src="" alt="signature" />
                            <span>Authorised Signatory</span>
                        </div>

                    </div>

                    
                </div>

                <div className="q-invoice-terms-wrapper">
                    <div className="terms-heading">
                        Terms & Conditions
                    </div>
                    <ol className="invoice-terms">
                        {data?.terms_and_conditions.map((term) => {
                            return <li>{term.value}</li>
                        })}
                    </ol>
                </div>

                <div className="q-invoice-notes-wrapper">
                    <div className="notes-heading">
                        Additional Notes
                    </div>
                    <div className="ck-editor-contents">
                        {parse(data?.notes)}
                    </div>
                </div>

                <div className="q-invoice-terms-wrapper">
                    <div className="invoice-table">
                        <tbody>
                                {data?.additional_info.map((item) => {
                                    return (
                                    <>
                                        <tr>
                                            <th>{item.fieldName}</th>
                                            <td>{item.value}</td>    
                                        </tr>
                                    </>
                                    )
                                })}     
                        </tbody>
                    </div>
                </div>

                <div className="q-attachment-wrapper">
                    <div className="attachment-heading">
                        Attachemnt
                    </div>
                    <div className="attachment-link-wrapper">
                        <div className="attachment-link">
                            <span><a href="" target="_blank">ref2343423.pdf</a></span>
                        </div>
                    </div>
                </div>

                <div className="q-invoice-contact-wrapper">
                    <span>For any enquiry, reach out via </span>
                    <span>
                        email at
                        <b> {data?.contact_info.email} </b>
                    </span>
                    <span> , call on </span>
                    <span className="phone-input">
                        <b> {data?.contact_info.phone} </b>
                    </span>
                </div>


            </div>
        </>
    )
}

export default PrintOuotation;