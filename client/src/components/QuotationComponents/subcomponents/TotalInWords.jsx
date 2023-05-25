import { useEffect, useState } from "react";

import { CloseOutlined } from "@ant-design/icons";

function useTotalInWords({ total, setIsTotalInWords }) {
  const [ amountInWords , setAmountInWords ] = useState("Zero Only");

  useEffect(() => {
    let totalAmount = numberToWords(total);
    let totalAmountOnly = `${totalAmount} Only`;
    setAmountInWords(totalAmountOnly);
  },[total])

  function numberToWords(number) {
        const units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
        const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
        const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
      
        if (number === 0) {
          return "Zero";
        }
      
        let result = "";
      
        if (number >= 1000000) {
          result += numberToWords(Math.floor(number / 1000000)) + " Million ";
          number %= 1000000;
        }
      
        if (number >= 1000) {
          result += numberToWords(Math.floor(number / 1000)) + " Thousand ";
          number %= 1000;
        }
      
        if (number >= 100) {
          result += units[Math.floor(number / 100)] + " Hundred ";
          number %= 100;
        }
      
        if (number >= 10 && number <= 19) {
          result += teens[number - 10];
          return result.trim();
        } else if (number >= 20) {
          result += tens[Math.floor(number / 10)] + " ";
          number %= 10;
        }
      
        if (number > 0) {
          result += units[number];
        }
      
        return result.trim();
      }
      
    
    const totalWrapper = {
        display: "flex",
        width: "100%",
        flexDirection: "column",
        justifyContent: "flex-start",
        marginBottom: "1rem"
    }
    const totalWords = {
        display: "flex",
        fontSize: "1.1rem",
        fontWeight: "700",
        color: "rgb(87,102,120)"
    }
    const totalContainer = {
        display: "flex",
        justifyContent: "space-between",
        
    }
    return  {
      amountInWords,
      render: (
        <>
        <div style={totalWrapper}>

            <div style={totalContainer}>
                <div>Total (in words)</div>
                <div><CloseOutlined onClick={() => setIsTotalInWords(false)}/></div>
            </div>
            <div style={totalWords}>
               { amountInWords } 
            </div>
                
        </div>
                
        </>
    )
  }
};

export default useTotalInWords;