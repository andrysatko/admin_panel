import React, { useEffect } from "react";
import "./bycicle.css";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { deleteBicycleAsync,updateBicycleAsync } from '../../features/bicycleSlice';
export default function Item({ name, type, color, id, price, status = "available" }) {
    const dispatch = useDispatch();

    const changeStatus = async () => {
        const PossibleStatus = ['available', 'busy', 'unavailable']
        const index = PossibleStatus.indexOf(status);
        const nextStatus = PossibleStatus[(index + 1) % PossibleStatus.length];
        try {
            await dispatch(updateBicycleAsync({id,status:nextStatus}));
        }
        catch (e) { console.log(e) }
    }
    const deleteItem = async ()=> {
        try{
            await dispatch(deleteBicycleAsync(id));
        }
        catch(e){console.log(e)}
    }
    function Color(status) {
        switch (status) {
            case "available": return "#6FCF97";
            case "busy": return "#F2994A";
            case "unavailable": return "#EB5757";
        }
    }
    return (
        <div style={{ border: `2px solid ${Color(status)}`,opacity: status==="unavailable"?0.5:1 }} className="item">
            <div className="item_left">
                <div style={{ display: "flex", height: "19px" }}>
                    <h1 className="item_name">{name}</h1>
                    <h1 className="item_typeScolor">- {type} ({color})</h1>
                </div>
                <h1 className="item_id">ID: {id}</h1>
                <div className="statusBlock">
                    <h1 className="status">STATUS:</h1>
                    <div>
                        <h1 className="available">{status}<span><svg xmlns="http://www.w3.org/2000/svg" width="10" height="5" viewBox="0 0 10 5" fill="none">
                            <path d="M0 0L5 5L10 0H0Z" fill="black" 
                            onClick={e => changeStatus()}
                            cursor={'pointer'}
                            />
                        </svg></span></h1>
                    </div>
                </div>
            </div>
            <div className="item_right">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M9 9L1 1M9 1L1 9" stroke="black" strokeWidth="2" strokeLinecap="round" 
                        onClick={e => deleteItem()}
                        cursor={'pointer'}
                        />
                    </svg>
                    <h1 className="price">{price} UAH/hr.</h1>
                </div>
            </div>
        </div>
    );
};
