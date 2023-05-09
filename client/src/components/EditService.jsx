import "./CreateService.css";

import  { Col, Input, InputNumber, Row, Switch } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Currency from "../components/sub-components/Currency.jsx";
import PlanType from "../components/sub-components/PlanType";
import { PlusSquareOutlined } from "@ant-design/icons";
import Preview from '../components/Preview';
import SelectServices from "../components/sub-components/SelectServices";
import axios from "axios";

const EditService = () => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.state.id);
    const id = location.state.id;

    const [serviceText, setServiceText ] = useState("");
    const [para, setPara ] = useState("");
    const [ tags , setTags ] = useState([]);
    const [isPricing , setIsPricing ] = useState();
    const [ currency,  setCurrency] = useState();
    const [ isPriceRange, setIsPriceRange ] = useState();
    const [ isDiscountPrice, setIsDiscountPrice ] = useState(false);
    const [ amount, setAmount ] = useState();
    const [ planType, setPlanType ] = useState();
    const [ minAmount , setMinAmount ] = useState();
    const [ maxAmount , setMaxAmount ] = useState();
    const [ preDiscountPrice, setPreDiscountPrice ] = useState();

    useEffect(() => {
        axios
          .get(`http://localhost:3001/service/${id}`, {
          })
          .then((response) => {
            const { data } = response;
                setServiceText(data.service_name);
                setPara(data.service_para);
                setTags(data.service_tags);
                setIsPricing(data.isPricing);
                setCurrency(data.pricing.service_currency);
                setIsPriceRange(data.pricing.isPriceRange);
                setIsDiscountPrice(data.pricing.isDiscountPrice);
                setAmount(data.pricing.service_amount);
                setPlanType(data.pricing.service_plan_type);
                setMinAmount(data.pricing.min_amount);
                setMaxAmount(data.pricing.max_amount);
                setPreDiscountPrice(data.pricing.pre_discount_price);
            }) 
          .catch((error) => {
            console.error(error);
          });
      }, [id]);
      
      console.log("2" , tags);
    
    const onChange = (checked) => {
        setIsPricing(!checked);
    };
    const handlePriceRange = (checked) => {
        setIsPriceRange(checked);
    };

    const handlePlanType = (value) => {
        setPlanType(value);
    }
    
    const updateServiceComp = () => {
        const putData = async () => {
            const data = {
                service_name: serviceText,
                service_para: para,
                service_tags: tags,
                isPricing: isPricing,
                pricing: {
                  service_currency: currency,
                  service_amount: amount,
                  service_plan_type: planType,
                  isPriceRange: isPriceRange,
                  min_amount: minAmount,
                  max_amount: maxAmount,
                  isDiscountPrice: isDiscountPrice,
                  pre_discount_price: preDiscountPrice,
                },
              };
            try {
              await axios.put(`http://localhost:3001/editservice/${id}`, data, {
                headers: {
                  'Content-Type': 'application/json'
                }
              });
            
              navigate('/service/success');

            } catch (error) {
              console.log(error);
              navigate('/service/failure')
            }
          }
          
        putData();
      };
      
  return <>
  
  <Row gutter={[48]}>
      <Col flex={3} style={{ 
          maxWidth: '60%', 
          width: '100%' 
          }} >
    <div class="cs-container">
        <div class="cs-wrapper">
            <div>

                <div class="cs-heading">
                    <span>Service Details</span>
                </div>


                <div class="box1">
                    <div class="cs-detials">
                        <label class="label">Name of the Service</label>
                        <span class="required">*</span>
                        <span class="undertext">An easy to read, short name is better</span>
                        <div>
                        <Input onChange={(e) => setServiceText(e.target.value)} label="Name of Service" placeholder="E.g. Mobile App Development" name="name" value={serviceText} autoComplete="off" />
                        </div>
                    </div>
                </div>


                <div class="box1">
                    <div class="cs-detials">
                        <label class="label">Describe your Product/Service</label>
                        <span class="required">*</span>
                        <span class="undertext">Help your potential clients understand what your Product or Service is about.</span>
                        <div>
                        <Input onChange={(e) => setPara(e.target.value)} label="Name of Service" placeholder="Write something about your product/services" name="name" value={para} />
                        </div>
                    </div>
                </div>


                <div class="box1">
                    <div class="cs-detials">
                        <label class="label">Service Categories</label>
                        <span class="required">*</span>
                        <span class="undertext">Enter 5 categories that define the domain of your service.</span>
                        <div>
                         <SelectServices setTags={setTags} initialValue={tags} />
                        </div>
                    </div>
                </div>


                <div class="box1">
                    <div class="cs-detials">
                        <div class="cs-heading">Pricing</div>
                        <span class="undertext">Define pricing for your services. You can add multiple price plans too.</span>
                    </div>
                </div>

                <div class="box1">
                    <div class="cs-detials">
                        <div class="label">Contact For Pricing</div>
                        <Switch defaultChecked onChange={onChange} style={{marginLeft:"10px"}} />
                        <span class="undertext">All your price plans will not be shown publically. Disable this to add price plans</span>
                    </div>

                    {isPricing && 
                        <div>
                            
                            <div class="box2">
                                <div class="cs-detials">
                                    <div class="cs-mb">
                                        <label class="label ">Currency</label> <span class="required">*</span>
                                    </div>
                                        <Currency setCurrency={setCurrency} initialValue={currency}/>                                       
                                </div>
                            </div>

                            <div class="box2">
                                <div class="cs-details">
                                    <div class="cs-mb">
                                        <label class="label">Enable Price Range</label>
                                        <Switch onChange={handlePriceRange} style={{marginLeft:"10px"}}/>
                                    </div>

                                    { isDiscountPrice ?
                                        <div>
                                            <div class="cs-detials">
                                                <div class="cs-mb">
                                                    <label class="label ">Pre-discount Price</label>
                                                </div>
                                                <InputNumber style={{width:"80%"}} min={1} max={1000000} defaultValue={0} value={preDiscountPrice} onChange={(value) => setPreDiscountPrice(value)} />                                    
                                            </div>
                                        </div>
                                        :
                                        <button class="cs-discount-btn" onClick={() => setIsDiscountPrice(true)}> 
                                            <PlusSquareOutlined style={{ color:"rgb(115, 61, 217)" , paddingRight: "5px"}} />
                                            Add pre-discounted price also
                                        </button>
                                    }
                                    
                                </div>
                            </div>

                            
                            {isPriceRange ?
                                <div class="box2">
                                <div class="cs-price-range">

                                    <div class="wrap">
                                        <div class="cs-mb">
                                            <label class="label ">Min Amount</label> <span class="required">*</span>
                                        </div>
                                        <InputNumber style={{width:"100%"}} min={0} max={1000000} defaultValue={0} value={minAmount} onChange={(value) => setMinAmount(value)} />      
                                    </div>

                                    <div class="wrap">
                                        <div class="cs-mb">
                                            <label class="label ">Max Amount</label> <span class="required">*</span>
                                        </div>
                                        <InputNumber style={{width:"100%"}} min={0} max={1000000} defaultValue={0} value={maxAmount} onChange={(value) => setMaxAmount(value)} />    
                                    </div>    

                                </div>
                                </div>
                                
                                :

                                <div class="box2">
                                <div class="cs-detials">
                                    <div class="cs-mb">
                                        <label class="label ">Amount</label> <span class="required">*</span>
                                    </div>
                                    <InputNumber style={{width:"80%"}} min={0} max={1000000} defaultValue={0} value={amount} onChange={(value) => setAmount(value)} />                                    
                                </div>
                                </div>
                            }
                            
                            <div class="box2">
                                <div class="cs-detials">
                                    <div class="cs-mb">
                                        <label class="label ">Plan Types</label> <span class="required">*</span>
                                    </div>
                                        <PlanType handlePlanType={handlePlanType} initialValue={planType} />                                       
                                </div>
                            </div>
                            
                        </div>
                    }
                </div>

                <div class="button">
                    <button type="submit" class="cs-btn" onClick={updateServiceComp} >Update Service</button>
                </div>


            </div>
        </div>
    </div>
    </Col>

    <Col flex={2}>
        <Preview 
            serviceText={serviceText} 
            para={para}
            amount={amount}
            isPriceRange={isPriceRange}
            minAmount={minAmount}
            maxAmount={maxAmount}
            planType={planType}
            isPricing={isPricing}
        />
      </Col>
    </Row>

  </>;
};

export default EditService;
