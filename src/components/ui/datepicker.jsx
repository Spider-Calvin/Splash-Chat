import React, { useEffect, useState } from 'react';
import Datepicker from "react-tailwindcss-datepicker"; 

function DatePicker({value='', onValueChange=()=>{}, maxiDate=''}) {

    const [xValue, setXValue] = useState({ 
        startDate: null,
        endDate: null 
    }); 
        
    const handleValueChange = (newValue) => {
        setXValue(newValue);
        onValueChange(newValue.startDate)
    }

    useEffect(()=>{
        setXValue({
            startDate: value,
            endDate: value 
        })
    },[value])

  return (
    <Datepicker
        inputClassName="w-full rounded-lg text-sm focus:ring-2 px-4 border-gray-200 border-1 focus:ring-blue-950"
        useRange={false}
        asSingle={true}
        maxDate={new Date(maxiDate)}
        placeholder=" "
        value={xValue}
        displayFormat={"MMM DD, YYYY"}
        onChange={handleValueChange}
        popoverDirection="down" 
    />
  )
}

export default DatePicker