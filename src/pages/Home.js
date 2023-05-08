import "./Home.css";

import { Col, Row } from "antd";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { ServiceComponent } from "../components/ServiceComponent";

function Home() {
  
  return (
    <>
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
      <Row>
       <ServiceComponent services={services} />
      </Row>
    </>
  );
}

export default Home;
