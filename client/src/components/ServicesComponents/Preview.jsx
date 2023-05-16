import "./Preview.css";

import {Col, Row, Skeleton} from "antd";

import React from "react";
import parse from "html-react-parser";

const Preview = ({serviceText, editorText , symbol, amount, isPriceRange, minAmount, maxAmount, planType, isPricing }) => {
  
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
                      { editorText
                        ?
                          <div class="p-paragraph">
                          {parse(editorText)}
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
                       {symbol}{minAmount} - {symbol}{maxAmount}
                      </Col>
                      :
                      <Col className="p-pricetext">
                       {symbol}{amount}
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
