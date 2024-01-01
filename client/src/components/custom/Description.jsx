import React from 'react';
import './description.css';
export default function DescriptoinInput ({ value,onChange }){
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return <input className="Input" type="text" value={value} placeholder={"description"} onChange={handleChange} />;
};
