import "./CreateService.css";

import  { Col, Input, InputNumber, Row, Switch } from "antd";
import React, { useState } from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Currency from "../../components/ServicesComponents/sub-components/Currency.jsx";
import PlanType from "../../components/ServicesComponents/sub-components/PlanType";
import { PlusSquareOutlined } from "@ant-design/icons";
import Preview from "../../components/ServicesComponents/Preview";
import SelectServices from './../../components/ServicesComponents/sub-components/SelectServices';
import axios from "axios";
import { useNavigate } from "react-router-dom";

// import parse from "html-react-parser";



const CreateService = () => {
    const navigate = useNavigate();

    const [serviceText, setServiceText ] = useState("");
    const [ editorText, setEditorText ] = useState("");
    const [ tags , setTags ] = useState([]);
    const [ symbol, setSymbol ] = useState("");
    const [isPricing , setIsPricing ] = useState();
    const [ currency,  setCurrency] = useState();
    const [ isPriceRange, setIsPriceRange ] = useState();
    const [ isDiscountPrice, setIsDiscountPrice ] = useState(false);
    const [ amount, setAmount ] = useState();
    const [ planType, setPlanType ] = useState();
    const [ minAmount , setMinAmount ] = useState();
    const [ maxAmount , setMaxAmount ] = useState();
    const [ preDiscountPrice, setPreDiscountPrice ] = useState();
    
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
        const postData = async () => {
            const data = {
                service_name: serviceText,
                service_para: editorText,
                service_tags: tags,
                isPricing: isPricing,
                pricing: {
                  service_currency: currency,
                  service_currency_symbol: symbol,
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
              await axios.post('http://localhost:3001/new/service', data, {
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
          
        postData();
    
        setServiceText("");
        setEditorText("");
        setTags([]);
        setSymbol("");
        setIsPricing(false);
        setIsPriceRange();
        setIsDiscountPrice(false);
        setAmount();
        setPlanType();
        setMinAmount();
        setMaxAmount();
        
      };
      
  return <>
  
  <Row gutter={[18]}>
      <Col xs={24} sm={24} md={14} lg={16} xl={16} xxl={16} >
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
                        {/* <Input onChange={(e) => setPara(e.target.value)} label="Name of Service" placeholder="Write something about your product/services" name="name" value={para} /> */}
                            <CKEditor
                                editor={ClassicEditor}
                                data={editorText}
                                onChange={(event ,editor) => {
                                    const data = editor.getData();
                                    setEditorText(data)
                                }}
                            />
                            {/* {parse(editorText)} */}
                        
                        </div>
                    </div>
                </div>


                <div class="box1">
                    <div class="cs-detials">
                        <label class="label">Service Categories</label>
                        <span class="required">*</span>
                        <span class="undertext">Enter 5 categories that define the domain of your service.</span>
                        <div>
                         <SelectServices setTags={setTags} />
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
                                        <Currency setCurrency={setCurrency} setSymbol={setSymbol}/>                                       
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
                                                <InputNumber style={{width:"80%"}} min={1} max={1000000} defaultValue={0} onChange={(value) => setPreDiscountPrice(value)} />                                    
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
                                        <InputNumber style={{width:"100%"}} min={0} max={1000000} defaultValue={0} onChange={(value) => setMinAmount(value)} />      
                                    </div>

                                    <div class="wrap">
                                        <div class="cs-mb">
                                            <label class="label ">Max Amount</label> <span class="required">*</span>
                                        </div>
                                        <InputNumber style={{width:"100%"}} min={0} max={1000000} defaultValue={0} onChange={(value) => setMaxAmount(value)} />    
                                    </div>    

                                </div>
                                </div>
                                
                                :

                                <div class="box2">
                                <div class="cs-detials">
                                    <div class="cs-mb">
                                        <label class="label ">Amount</label> <span class="required">*</span>
                                    </div>
                                    <InputNumber style={{width:"80%"}} min={0} max={1000000} defaultValue={0} onChange={(value) => setAmount(value)} />                                    
                                </div>
                                </div>
                            }
                            
                            <div class="box2">
                                <div class="cs-detials">
                                    <div class="cs-mb">
                                        <label class="label ">Plan Types</label> <span class="required">*</span>
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

    <Col xs={24} sm={24} md={10} lg={8} xl={8} xxl={8}>
        <Preview 
            serviceText={serviceText} 
            editorText={editorText}
            symbol={symbol}
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
