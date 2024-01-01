import React from 'react';
import { useState } from 'react';
import './createPostForm.css';
import Description from './custom/Description';
import Button from './custom/Button';
import CustomInput from './custom/Input';
import { useDispatch } from 'react-redux';
import { createBicycleAsync } from '../features/bicycleSlice';
import {useSelector } from 'react-redux';
export default function CreatePostForm(){
const initialFormState = {name:"",type:"",color:"",wheelSize:"",price:"",id:"",description:""}
const dispatch = useDispatch();
const bicycles = useSelector((state) => state.bicycles.bicycles);
const [formData , setFormData] = useState(initialFormState)
const setName = (name) => {setFormData({...formData,name})}
const setType = (type) => {setFormData({...formData,type})}
const setColor = (color) => {setFormData({...formData,color})}
const setWheelSize = (wheelSize) => {setFormData({...formData,wheelSize:Number(wheelSize)})}
const setPrice = (price) => {setFormData({...formData,price:Number(price)})}
const setId = (id) => {setFormData({...formData,id})}
const setDescription = (description) => {setFormData({...formData,description})}
const ValidateForm = ()=>{
    for(const key in formData){
        if(!formData[key]){
            alert(`Please fill ${key} field`)
            return false;
        }
        if(key!=="price" && key!=="wheelSize"){
            if(formData[key].length<5){
                alert(`${key} must be at least 5 symbols`)
                return false;
            }
        }
    }
    if(!/^[0-9a-fA-F]{24}$/.test(formData.id.toLowerCase())){
        alert(`Id must be a valid hex24 string`)
        return false;
    }
    if(!bicycles.every(bike => bike.id !== formData.id.toLowerCase())){
        alert(`Bike with id ${formData.id} already exists`)
        return false;
    }
    return true;
}
const handleSubmit =async (e) => {
    e.preventDefault();
    try{
        ValidateForm() && await dispatch(createBicycleAsync(formData));
    }
    catch(e){console.log(e)}
  };
    return (
        <form className='bycicle_form' onSubmit={handleSubmit}>
            <div className='bycicle_form_row'>
                <CustomInput placeHolder={"Name"} value={formData.name} onChange={setName}></CustomInput>
                <CustomInput placeHolder={"Type"} value={formData.type} onChange={setType}></CustomInput>
            </div>
            <div className='bycicle_form_row'>
                <CustomInput placeHolder={"Color"} value={formData.color} onChange={setColor}></CustomInput>
                <CustomInput placeHolder={"Wheel size"} type='number' value={formData.wheelSize} onChange={setWheelSize}></CustomInput>
            </div>
            <div className='bycicle_form_row'>
                <CustomInput placeHolder={"Price"} type='number' value={formData.price} onChange={setPrice}></CustomInput>
                <CustomInput placeHolder={"ID (slug): ХХХХХХХХХХХХХ"} value={formData.id} onChange={setId}></CustomInput>
            </div>
            <Description value={formData.description} onChange={setDescription}/>
            <div className='bycicle_form_row'>
                <Button type='submit' value={"SAVE"}></Button>
                <Button  value={"CLEAR"} onClick={e=> setFormData(initialFormState)}></Button>
            </div>
        </form>
    )
}