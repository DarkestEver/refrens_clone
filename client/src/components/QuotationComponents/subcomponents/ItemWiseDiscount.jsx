import { CloseOutlined } from "@ant-design/icons";
import { useState } from "react";

function useItemWiseDiscount({ setIsItemWiseDiscount }) {
    const [ IWdiscount , setIWDiscount ] = useState(0);
    const [ discountType , setDiscountType ] = useState('%');

    return {
        IWdiscount,
        discountType,
    render: (
        <>
            <div className="discount-bg">
                    <div className="n-top-desc">
                        <div className="qae-key">
                             Discount ({IWdiscount} {discountType})
                         </div>

                         <div className="qae-value" style={{width:"70px"}} >
                            <input 
                                className="qae-input-value" 
                                style={{width:"70px"}}
                                onChange={(e) => setIWDiscount(e.target.value) } 
                            />
                        </div>
                        
                        <select
                            name="countries"
                            placeholder="Select Country"
                            className="qae-label"
                            value={discountType}
                            onChange={(e) => setDiscountType(e.target.value)}
                            >   
                                <option value="%" selected>%</option>
                                <option value="₹">₹</option>
                            </select>

                        <CloseOutlined onClick={() => setIsItemWiseDiscount(false)}/>
                    
                    </div>
                             
            </div>
        </>
    ),
}

};

export default useItemWiseDiscount;