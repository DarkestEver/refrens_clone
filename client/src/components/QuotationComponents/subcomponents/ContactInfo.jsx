import { CloseOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";

import { Input } from "antd";
import { useState } from "react";

function useContactInfo({ setIsContact }) {
    const [ email, setEmail ] = useState();
    const [ phone , setPhone ] = useState();

    return {
        email,
        phone,
        render: (
            <>
            <div className="n-notes">
                    <div className="n-top-desc">Your Contact Details
                        {/* <CloseOutlined onClick={() => setIsContact(false)}/> */}
                    </div>
                    <div className="contact-box">
                        <Input defaultValue="For any enquiry, reach out via"  />
                        <Input defaultValue="email at"  />
                        <Input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Your email (optional)" prefix={<MailOutlined />} />
                        <Input defaultValue="call on" />
                        <Input onChange={(e) => setPhone(e.target.value)} placeholder="+91-XXXXXXXXXX" prefix={<PhoneOutlined />} />
                    </div>
                </div>

            </>
        )
    }
};

export default useContactInfo;