import { Input, InputNumber, Select } from "antd";

import TextArea from "antd/es/input/TextArea";

const { Option } = Select;

const LeadModal = () => {

    const selectBefore = (
        <Select
          defaultValue="IND"
        >
          <Option value="IND">+91</Option>
          <Option value="USA">+1</Option>
        </Select>
      );

    return (
        <>
                    <div>
                        
                        <div style={{margin: "1rem"}}>
                            <div class="cs-detials">
                                <label class="label">Customer Name</label>
                                <span class="required">*</span>
                                <div>
                                <Input label="Customer Name" name="customer-name" autoComplete="off" />
                                </div>
                            </div>
                        </div>

                        <div style={{margin: "1rem"}}>
                            <div class="cs-detials">
                                <label class="label">Customer's Work Email</label>
                                <span class="required">*</span>
                                <div>
                                <Input label="Customer's Work Email" name="customers-work-email" autoComplete="off" />
                                </div>
                            </div>
                        </div>

                        <div style={{margin: "1rem"}}>
                            <div class="cs-detials">
                                <label class="label">Customer's Phone Number</label>
                                <span class="required">*</span>
                                <div>
                                <InputNumber addonBefore={selectBefore}  />
                                </div>
                            </div> 
                        </div>

                        <div style={{margin: "1rem"}}>
                            <div class="cs-detials">
                                <label class="label">What is the Customer Looking for?</label>
                                <span class="required">*</span>
                                <div>
                                <TextArea placeholder="E.g. Logo design, content, social media marketplace" />

                                </div>
                            </div>
                        </div>

                        <div style={{margin: "1rem"}}>
                            <div class="cs-detials">
                                <label class="label">Approx Budget</label>
                                <div>
                                <InputNumber addonBefore={selectBefore}  />
                                </div>
                            </div>
                        </div>



                    </div>
        </> 
    )
}

export default LeadModal;