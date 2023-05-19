import { CloseOutlined } from "@ant-design/icons";
import { useState } from "react";

function DiscountOnTotal({ setIsDiscountOnTotal , getDiscountOnTotal }) {
    const [ valueText , setValueText ] = useState("Reduction");
    const [ keyText , setKeyText ] = useState(0);
    const [ discountType , setDiscountType ] = useState('%');

    getDiscountOnTotal(valueText, keyText, discountType);

    return (
        <>
        <div className="discount-bg">
                <div className="n-top-desc">
                        <div className="qae-key">
                            <input
                                type="text"
                                className="qae-label"
                                style={{width:"120px"}}
                                value={valueText}
                                onChange={(e) => setValueText(e.target.value)}
                            />
                        </div>

                        <div className="qae-value" style={{width:"100px"}} >
                            <input 
                                className="qae-input-value" 
                                style={{width:"70px"}}
                                onChange={(e) => setKeyText(e.target.value)} 
                                value={keyText}
                            />
                        </div>
            
                    <select
                        className="qae-label"
                        value={discountType}
                        onChange={(e) => setDiscountType(e.target.value)}
                        >   
                            <option value="₹" selected>₹</option>
                            <option value="%" >%</option>
                        </select>

                    <CloseOutlined onClick={() => setIsDiscountOnTotal(false)}/>
                
                </div>
                         
        </div>
        </>
    )
};

export default DiscountOnTotal;