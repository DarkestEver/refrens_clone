import "./CreateService.css";

import  { Col, Input, InputNumber, Row, Switch } from "antd";
import React, {useState} from "react";

import Currency from "../components/sub-components/Currency.jsx";
import PlanType from "../components/sub-components/PlanType";
import { PlusSquareOutlined } from "@ant-design/icons";
import Preview from '../components/Preview';
import SelectServices from "../components/sub-components/SelectServices";

const CreateService = ({addService}) => {
  const [ services , setServices ] = useState([]);

    const [serviceText, setServiceText ] = useState("");
    const [para, setPara ] = useState("");
    const [isPricing , setIsPricing ] = useState();
    const [ isPriceRange, setIsPriceRange ] = useState();
    const [ isDiscountPrice, setIsDiscountPrice ] = useState(false);
    const [ amount, setAmount ] = useState();
    const [ planType, setPlanType ] = useState();
    const [ minAmount , setMinAmount ] = useState();
    const [ maxAmount , setMaxAmount ] = useState();
    
    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
        setIsPricing(!checked);
    };
    const handlePriceRange = (checked) => {
        console.log(`Price range switch to ${checked}`);
        setIsPriceRange(checked);
    };

    const handlePlanType = (value) => {
        console.log(`Parent ${value}`)
        setPlanType(value);
    }

    const saveServiceComp = () => {
        const service = {
          name: serviceText,
          description: para,
          pricing: {
            isContactForPricing: isPricing,
            currency: "",
            isPriceRange: isPriceRange,
            isDiscountedPrice: isDiscountPrice,
            amount: amount,
            planType: planType,
            minAmount: minAmount,
            maxAmount: maxAmount,
          },
        };
        setServices([...services, service]);
        console.log("CreateServices page", services);
        addService(services);
    
        setServiceText("");
        setPara("");
        setIsPricing(false);
        setIsPriceRange(false);
        setIsDiscountPrice(false);
        setAmount(undefined);
        setPlanType(undefined);
        setMinAmount(undefined);
        setMaxAmount(undefined);
      
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
                         <SelectServices />
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
                                        <label class="label ">Currency</label>
                                    </div>
                                        <Currency />                                       
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
                                                <InputNumber style={{width:"80%"}} min={1} max={1000000} defaultValue={0} onChange={(value) => console.log("Pre-discount price:", value)} />                                    
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
                                            <label class="label ">Min Amount</label>
                                        </div>
                                        <InputNumber style={{width:"100%"}} min={0} max={1000000} defaultValue={0} onChange={(value) => setMinAmount(value)} />      
                                    </div>

                                    <div class="wrap">
                                        <div class="cs-mb">
                                            <label class="label ">Max Amount</label>
                                        </div>
                                        <InputNumber style={{width:"100%"}} min={0} max={1000000} defaultValue={0} onChange={(value) => setMaxAmount(value)} />    
                                    </div>    

                                </div>
                                </div>
                                
                                :

                                <div class="box2">
                                <div class="cs-detials">
                                    <div class="cs-mb">
                                        <label class="label ">Amount</label>
                                    </div>
                                    <InputNumber style={{width:"80%"}} min={0} max={1000000} defaultValue={0} onChange={(value) => setAmount(value)} />                                    
                                </div>
                                </div>
                            }
                            
                            <div class="box2">
                                <div class="cs-detials">
                                    <div class="cs-mb">
                                        <label class="label ">Plan Types</label>
                                    </div>
                                        <PlanType handlePlanType={handlePlanType} />                                       
                                </div>
                            </div>
                            
                        </div>
                    }
                </div>

                <div class="button">
                    <button type="submit" class="cs-btn" onClick={saveServiceComp} >Add a Service</button>
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

export default CreateService;
