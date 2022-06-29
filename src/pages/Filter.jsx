import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getFeedsAPI } from "../store/feed/feed.actions";

const Filter = () => {
     const [searchParams,setSearchParams] = useSearchParams()
     const urlCategory = searchParams.getAll("category")
    const [category,setCategory] = useState(urlCategory||[])
   const dispatch = useDispatch()
    const handleCheckbox = (e)=>{
        const option = e.target.value
        const newCategory = [...category]
        if(category.includes(option)){
            newCategory.splice(newCategory.indexOf(option),1)
        }else{
            newCategory.push(option)
        }
        setCategory(newCategory)
    }
    useEffect(()=>{
        if(category){
            setSearchParams({category})
        }
        
    },[category,setSearchParams,dispatch])
  return (
    <div>
      <input type="checkbox" onChange={handleCheckbox} value="Novel" defaultChecked={category.includes("Novel")} />
      <label>Novel</label>
      <input type="checkbox" onChange={handleCheckbox} value="Cartoon" defaultChecked={category.includes("Cartoon")} />
      <label>Cartoon</label>
      <br />
      <br />

    </div>
  );
};

export default Filter;
