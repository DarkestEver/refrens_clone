import "./GSTModal.css";

import { Radio } from 'antd';
import { useState } from 'react';

function CurrencyFormat() {
      const [number, setNumber] = useState(12345679);
      const [numberSystem, setNumberSystem] = useState('lakhs');
      const [decimalPlaces, setDecimalPlaces] = useState('0');
      
      const handleNumberSystemChange = (e) => {
        setNumberSystem(e.target.value);
      };

      const handleDecimalPlacesChange = (e) => {
        setDecimalPlaces(e.target.value);
      };
      const formatNumber = (number) => {
        let formattedNumber = number.toLocaleString('en-US');
      
        if (numberSystem === 'lakhs') {
          const crore = Math.floor(number / 10000000);
          const lakhs = Math.floor((number % 10000000) / 100000);
          const thousands = Math.floor((number % 100000) / 1000);
          const ones = number % 1000;
      
          formattedNumber = `${crore},${lakhs.toString().padStart(2, '0')},${thousands.toString().padStart(3, '0')},${ones.toString().padStart(3, '0')}`;
        }
      
        const decimalPlacesCount = parseInt(decimalPlaces);
        if (decimalPlacesCount > 0) {
          const decimalPart = (number % 1).toFixed(decimalPlacesCount).substring(2);
          formattedNumber += `.${decimalPart.padEnd(decimalPlacesCount, '0')}`;
        }
        
        console.log("Formatted Number: " + formattedNumber);
  
        return `€${formattedNumber}`;
      };
      
      
            
    
      return (
        <>
        <div className='nf-top-desc'>Change between Roman and Arabic number systems. Million vs. Lakhs.</div>
        
        <div className='gst-container'>
            <div className='gst-label'>
              <label>Select Number Format</label>
            </div>
            <Radio.Group onChange={handleNumberSystemChange} value={numberSystem}>
              <div className='nf-box1'>
                <Radio value="lakhs">India - English (Lakhs)</Radio>
              </div>
              <div className='nf-box1'> 
                <Radio value="millions">United States - English (Millions)</Radio>
              </div>
            </Radio.Group>
        </div>
        <div className='gst-container'>
            <div className='gst-label'>
              <label>Select Decimal Digitst</label>
            </div>
            <div className='nf-box2-container'>
              <Radio.Group onChange={handleDecimalPlacesChange} value={decimalPlaces}>
                <Radio className='nf-box2' value="0">99</Radio>
                <Radio className='nf-box2' value="1">99.0</Radio>
                <Radio className='nf-box2' value="2">99.00</Radio>
                <Radio className='nf-box2' value="3">99.000</Radio>
                <Radio className='nf-box2' value="4">99.0000</Radio>
              </Radio.Group>
            </div>
        </div>

        <div className='nf-result'>{formatNumber(number)}</div>

        </>
      );
    };
    
    
    
export default CurrencyFormat;