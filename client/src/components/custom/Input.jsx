import React from 'react';
import './input.css';
export default function CustomInput ({ value, placeHolder,onChange,type="text" }){
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return <input className="Input" type={type} value={value} placeholder={placeHolder} onChange={handleChange} />;
};
