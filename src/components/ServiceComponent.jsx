import { Col, Row } from "antd";

export const ServiceComponent = ({services}) => {
  
    services?.map(service => console.log(service));

    if (!services) {
        return <div>Loading...</div>;
    }  
      
    return (
        <>
 {services?.map((service, index) => {
            return <>
            <Col key={index}>
                <div class="p-container">
                    <div class="p-wrapper">
        
                        <div class="p-conmponent p-comp-style">
                            <div class="p-details">
                                <div class="p-heading">
                                {service.name}
                                </div>
                
                                    <div class="p-paragraph">
                                    {service.description}
                                    </div>
                                 
                            </div>

                                <>
                                <Row>
                                { service.pricing.isPriceRange ? 
                                <Col className="p-pricetext">
                                {service.pricing.minAmount} - {service.pricing.maxAmount}
                                </Col>
                                :
                                <Col className="p-pricetext">
                                {service.pricing.amount}
                                </Col>
                                }
                                <Col className="p-plantype">
                                {service.pricing.planType}
                                </Col>
                                </Row>
                                </>
                                
                        </div>

                    </div>
                </div>
            </Col>
            </>
        })}
        </>
    )
}