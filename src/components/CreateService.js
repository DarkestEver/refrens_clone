import "./CreateService.css";

import  { Input, Switch } from "antd";

import React from "react";
import Tags from "./Tags";

const CreateService = () => {
    
const onChange = (checked) => {
    console.log(`switch to ${checked}`);
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
                        <Input label="Name of Service" placeholder="E.g. Mobile App Development" name="name" class="" />
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
                         <Tags />
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
                        <div class="label" style={{paddingRight:"10px"}}>Contact For Pricing</div>
                        <Switch defaultChecked onChange={onChange} style={{background:"rgb(115, 61, 217)"}} />
                        <span class="undertext">All your price plans will not be shown publically. Disable this to add price plans</span>
                    </div>
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
