import { Col, Row } from "antd";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import ServiceComponent from "../components/ServiceComponent";
import axios from "axios";

function Home() {
  const [ services, setServices ] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/service');
        setServices(response.data);
      } catch (error) {
        console.error(error);
      }
     };

    fetchData();
    
  },[])
  
  console.log("API " , services);
  
  return (
    <>
    <div style={{margin: "0 1.5rem"}}>
      <Row>
        <Col span={18}>
          <h1>Service</h1>
        </Col>

        <Col span={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div>
            <Link to="/create-service" className="cs-btn">
              <PlusOutlined style={{ paddingRight: "5px" }} />
              Add Service
            </Link>
          </div>
        </Col>
      </Row>

      <Row gutter={[32,32]} style={{marginTop:"2rem"}}>
        <ServiceComponent services={services} setServices={setServices} />
      </Row>
    </div>
    </>
  );
}

export default Home;
