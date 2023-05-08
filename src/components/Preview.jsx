import "./Preview.css";

import {Col, Row, Skeleton} from "antd";
import React , {useState} from "react";

const Preview = ({serviceText, para , amount, isPriceRange, minAmount, maxAmount, planType, isPricing ,handleClick}) => {

  
  // const [ services , setServices ] = useState([]);

  // const handleClick = () => {
  //   const service = {
  //     name: serviceText,
  //     description: para,
  //     // pricing: {
  //     //   isContactForPricing: isPricing,
  //     //   currency: "",
  //     //   isPriceRange: isPriceRange,
  //     //   isDiscountedPrice: isDiscountPrice,
  //     //   amount: amount,
  //     //   planType: planType,
  //     //   minAmount: minAmount,
  //     //   maxAmount: maxAmount,
  //     // },
  //   };
  //   setServices([...services, service]);
  //   console.log("CreateServices page", services);
  //   setpropServices(services);

  //   setServiceText("");
  //   setPara("");
  //   // setIsPricing(false);
  //   // setIsPriceRange();
  //   setIsDiscountPrice(false);
  //   // setAmount();
  //   // setPlanType();
  //   // setMinAmount();
  //   // setMaxAmount();
    
  // };

  
  return <>
    <div class="p-container">
        <div class="p-wrapper">
            <div class="p-header">
                Preview
            </div>

            <div class="p-conmponent p-comp-style">
                <div class="p-details">
                    <div class="p-heading">
                      {serviceText}
                    </div>
                      { para
                        ?
                          <div class="p-paragraph">
                          {para}
                        </div>
                        :
                        <Skeleton />
                      }
                </div>

                  { isPricing ?

                    <>
                    <Row>
                    { isPriceRange ? 
                      <Col className="p-pricetext">
                      {minAmount} - {maxAmount}
                      </Col>
                      :
                      <Col className="p-pricetext">
                      {amount}
                      </Col>
                    }
                      <Col className="p-plantype">
                      {planType}
                      </Col>
                      </Row>
                    </>
                      
                  :
                  <div class="p-pricetext">
                    Price Available on Request
                  </div>
            
                  }

            </div>

        </div>
    </div>
  </>
};

export default Preview;
