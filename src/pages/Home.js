import "./Home.css";

import { Col, Row } from "antd";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import ServiceComponent from "../components/ServiceComponent";

function Home({services}) {
  // console.log("Home page", services);
  const [ mainservices, setMainServices ] = useState([]);

  useEffect(() => {
    const add = () => {

      setMainServices(...mainservices, services);
    }
    console.log("Home page" ,mainservices);
    add();
  },[]);
  
  console.log("Home page outside bracket" ,mainservices);
  return (
    <>
    <div style={{margin: "0 1.5rem"}}>
      <Row>
        <Col span={18}>
          <h1>Service</h1>
        </Col>

        <Col span={6}>
          <div>
            <Link to="/create-service" className="cs-btn">
              <PlusOutlined style={{ paddingRight: "5px" }} />
              Add Service
            </Link>
          </div>
        </Col>
      </Row>

      <Row gutter={[32,32]} style={{marginTop:"2rem"}}>
       {/* <ServiceComponent services={mainservices} /> */}
       {mainservices?.map((service, index) => {
            return <>
            <Col span={8} key={index}>
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
                            { service.pricing.isPricing ?
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
                            :
                            <div class="p-pricetext">
                                Price Available on Request
                            </div>
                        
                            }

                        </div>

                    </div>
                </div>
            </Col>
            </>
        })}
      
      </Row>
    </div>
    </>
  );
}

export default Home;
