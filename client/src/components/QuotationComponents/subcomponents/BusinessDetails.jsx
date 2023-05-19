import { Col, Row } from "antd";

import SelectBusiness from "../SelectBusiness";

function BusinessDetails() {
    return (
        <>
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
                        <div style={{padding:"5px", fontSize:'1.5rem'}}>Quotation For</div>
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
        </>
    )
};

export default BusinessDetails;