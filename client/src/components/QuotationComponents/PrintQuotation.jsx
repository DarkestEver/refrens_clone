import './PrintQuotation.css';

import { TweenOneGroup } from 'rc-tween-one';

function PrintOuotation(){
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
                                            <td className='q-td'>A000001</td>
                                        </tr>
                                        <tr>
                                            <th className='q-hash-table'>
                                                Quotation Date 
                                            </th>
                                            <td className='q-td'>May 18, 2023</td>
                                        </tr>
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
                            <div className="q-box-company">Prishav-technologies</div>
                            <div className="q-box-address">Nodida Sector 52, indiarpuram, Uttar Pradesh, 201014</div>
                        </div>
                    </div>

                    <div className="q-box-wrapper">
                        <div className="q-to">
                            <div className="q-box-head">Quotation To</div>
                            <div className="q-box-company">Accenture</div>
                            <div className="q-box-address">Nodida Sector 52, indiarpuram, Uttar Pradesh, 201014</div>
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
                                <tr>
                                    <td>1.</td>
                                    <td>Bag</td>
                                    <td>1</td>
                                    <td>₹ 3000</td>
                                    <td>10%</td>
                                    <td>₹ 2699</td>
                                </tr>
                                <tr>
                                    <td>2.</td>
                                    <td>Laptop</td>
                                    <td>1</td>
                                    <td>₹ 25000</td>
                                    <td>5%</td>
                                    <td>₹ 22000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='q-bank-total-wrapper'>
                    <div className="q-bank-words-wrapper">
                        <div className="q-bank-words">
                            <p>
                                <span>Total (in words) :</span>
                                <span className="invoice-total-in-words">One Hundred Rupees Only</span>
                            </p>
                        </div>
                    </div>
                    
                    <div className="q-total-sig-wrapper">
                        <table className="invoice-table">
                            <tbody>
                                <tr>
                                    <th>Sub Total</th>
                                    <td>₹ 59,000</td>
                                </tr>
                                <tr>
                                    <th>Discount</th>
                                    <td>(₹ 59,000)</td>
                                </tr>
                                <tr>
                                    <th>Extra Charges</th>
                                    <td>₹ 59,000</td>
                                </tr>
                                <tr>
                                    <th>Total (INR)</th>
                                    <td>₹ 159,000</td>
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
                        <li>Applicable taxes will be extra.</li>
                        <li>Applicable taxes will be extra.</li>
                    </ol>
                </div>

                <div className="q-invoice-notes-wrapper">
                    <div className="notes-heading">
                        Additional Notes
                    </div>
                    <div className="ck-editor-contents">
                        This is a note!
                    </div>
                </div>

                <div className="q-invoice-terms-wrapper">
                    <div className="invoice-table">
                        <tbody>
                            <tr>
                                <th>Good</th>
                                <td>Yess!</td>
                            </tr>
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
                        <b> laveshbisht01@gmail.com </b>
                    </span>
                    <span> , call on </span>
                    <span className="phone-input">
                        <b> +91 829385792 </b>
                    </span>
                </div>


            </div>
        </>
    )
}

export default PrintOuotation;