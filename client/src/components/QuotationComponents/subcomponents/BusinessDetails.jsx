import { Col, Row } from "antd";

function BusinessDetails({ SelectAddressRender , address , SelectBusinessRender , businessName ,ClientNameRender, clientName, ClientAddressRender , clientAddress}) {
    return (
        <>
        <Row gutter={[16,16]} style={{width:"100%",marginBottom:'2rem'}}>
            <Col flex="1">
                <div className="qae-box1">
                    <div className="qae-head">
                        <div style={{padding:"5px", fontSize:'1.5rem'}}>Quotation Form</div>
                        <span>(Your Details)</span>
                    </div>

                    <div style={{width:"100%"}}>
                        <div style={{margin:'10px 10px'}}>
                            { SelectBusinessRender }
                        </div>
                        { SelectAddressRender }
                    </div>
                
                    <div className="qae-container" style={{marginTop:'10px'}}>

                        <div className="qae-business-details"> Business details
                        
                            <div className="qae-business" style={{marginTop:'0.7rem'}}>
                                <div className="qae-input-add" >Business Name</div>
                                <div className="qae-input-val-add">{businessName}</div>
                            </div>
                            <div className="qae-business">
                                <div className="qae-input-add" >Address</div>
                                <div className="qae-input-val-add">{address}</div>
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

                    <div style={{width:"100%"}}>
                        <div style={{margin:'10px 10px'}}>
                            { ClientNameRender }
                        </div>
                        { ClientAddressRender }
                    </div>

                    <div className="qae-container" style={{marginTop:'10px'}}>

                        <div className="qae-business-details"> Business details
                        
                            <div className="qae-business" style={{marginTop:'0.7rem'}}>
                                <div className="qae-input" >Business Name</div>
                                <div className="qae-input-val">{clientName}</div>
                            </div>

                            <div className="qae-business">
                                <div className="qae-input-add" >Address</div>
                                <div className="qae-input-val-add" >{clientAddress}</div>
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