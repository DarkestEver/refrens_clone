import "./CreateService.css";

import  { Input, InputNumber, Switch } from "antd";
import React, {useState} from "react";

import Currency from "./Currency";
import PlanType from "./PlanType";
import SelectServices from "./SelectServices";

const CreateService = () => {
    const [serviceText, setServiceText ] = useState("");
    const [isPricing , setIsPricing ] = useState();
    const [ isPriceRange, setIsPriceRange ] = useState();
    
    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
        setIsPricing(!checked);
    };
    const handlePriceRange = (checked) => {
        console.log(`Price range switch to ${checked}`);
        setIsPriceRange(checked);
    };

  return <>
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
                        <Input onChange={(e) => setServiceText(e.target.value)} label="Name of Service" placeholder="E.g. Mobile App Development" name="name" class="" autoComplete="off" />
                        </div>
                    </div>
                </div>


                <div class="box1">
                    <div class="cs-detials">
                        <label class="label">Describe your Product/Service</label>
                        <span class="required">*</span>
                        <span class="undertext">Help your potential clients understand what your Product or Service is about.</span>
                        <div>
                        <Input label="Name of Service" placeholder="E.g. Mobile App Development" name="name" class="" />
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
                                </div>
                            </div>

                            <div class="box2">
                                <div class="cs-detials">
                                    <div class="cs-mb">
                                        <label class="label ">Pre-discount Price</label>
                                    </div>
                                    <InputNumber style={{width:"80%"}} min={1} max={1000000} defaultValue={0} onChange={(value) => console.log("Pre-discount price:", value)} />                                    
                                </div>
                            </div>

                            
                            {isPriceRange ?
                                <div class="box2">
                                <div class="cs-price-range">

                                    <div class="wrap">
                                        <div class="cs-mb">
                                            <label class="label ">Min Amount</label>
                                        </div>
                                        <InputNumber style={{width:"100%"}} min={1} max={1000000} defaultValue={0} onChange={(value) => console.log("Amount:", value)} />      
                                    </div>

                                    <div class="wrap">
                                        <div class="cs-mb">
                                            <label class="label ">Max Amount</label>
                                        </div>
                                        <InputNumber style={{width:"100%"}} min={1} max={1000000} defaultValue={0} onChange={(value) => console.log("Amount:", value)} />    
                                    </div>    

                                </div>
                                </div>
                                
                                :

                                <div class="box2">
                                <div class="cs-detials">
                                    <div class="cs-mb">
                                        <label class="label ">Amount</label>
                                    </div>
                                    <InputNumber style={{width:"80%"}} min={1} max={1000000} defaultValue={0} onChange={(value) => console.log("Amount:", value)} />                                    
                                </div>
                                </div>
                            }
                            
                            <div class="box2">
                                <div class="cs-detials">
                                    <div class="cs-mb">
                                        <label class="label ">Plan Types</label>
                                    </div>
                                        <PlanType />                                       
                                </div>
                            </div>
                            
                        </div>
                    }
                </div>

                <div class="button">
                    <button type="submit" class="cs-btn">Add a Service</button>
                </div>


            </div>
        </div>
    </div>
  </>;
};

export default CreateService;
