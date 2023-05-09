import "./ServiceComponent.css";

import { Col, Divider, Modal, Row } from "antd";
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from "@ant-design/icons";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const { confirm } = Modal;

const ServiceComponent = ({ services, setServices }) => {
  const navigate = useNavigate();

  const showDeleteConfirm = (serviceId) => {
     confirm({
      title: 'Delete Service',
      icon: <ExclamationCircleFilled />,
      content: 'You are deleting a service. Deleted services cannot be recovered. Do you still want to continue?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteService(serviceId);
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel button');
      },
    });
  };

    const deleteService = async (serviceId) => {
        try {
          await axios.delete(`http://localhost:3001/delete/service/${serviceId}`);
          setServices((prevService) => prevService.filter((s) => s._id !== serviceId));
        } catch(error) {
          console.error(error);
        };
    };

    const handleEdit = async (serviceId) => {
      const fetchData = async () => {
        try {
          const response = await axios.put(`http://localhost:3001/editservice/${serviceId}`);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
       };
  
      fetchData();
      console.log("Clicked on Edit")
      console.log(serviceId);
      navigate("/edit-service", { state : {id: serviceId} } );
    }

    return (
        <>
           {services?.map((service, index) => {
            return <>
            <Col span={8} key={index} id={service._id} className="">
                <div class="service-components">
                    <div class="p-wrapper">

                        <div class="p-conmponent p-comp-style">
                            <div class="p-details">
                                <div class="p-heading">
                                {service.service_name}
                                </div>
                
                                    <div class="p-paragraph">
                                    {service.service_para}
                                    </div>
                                 
                            </div>
                            { service.isPricing ?
                                <>
                                <Row>
                                { service.pricing.isPriceRange ? 
                                <Col className="p-pricetext">
                                  ₹{service.pricing.min_amount} - ₹{service.pricing.max_amount}
                                </Col>
                                :
                                <Col className="p-pricetext">
                                  ₹{service.pricing.service_amount}
                                </Col>
                                }
                                <Col className="p-plantype">
                                  {service.pricing.service_plan_type}
                                </Col>
                                </Row>
                                </>
                            :
                            <div class="p-pricetext">
                                Price Available on Request
                            </div>
                        
                            }

                            <Divider />
                            <Row>
                              <Col onClick={() => showDeleteConfirm(service._id)} style={{cursor:"pointer"}} >
                                <DeleteOutlined  /> Delete
                              </Col>
                              <Divider type="vertical" />
                              <Col onClick={() => handleEdit(service._id)} style={{cursor:"pointer"}} >
                                <EditOutlined /> Edit
                              </Col>
                            </Row>

                        </div>

                    </div>
                </div>
            </Col>
            </>
        })} 
        
        </> 
    )
}

export default ServiceComponent;