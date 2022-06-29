import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

const Sort = () => {
    const [searchParams,setSearchParams]=useSearchParams()
    const urlSort = searchParams.get("sortBy")
    const [sortBy, setSortBy] = useState(urlSort||"")
 
    const handleSort = (e)=>{
        setSortBy(e.target.value)
    }
    useEffect(()=>{
       if(sortBy){
         const params = {
            category : searchParams.getAll("category"),
            sortBy
         }
      
         setSearchParams(params)
       }
    },[setSearchParams,sortBy])
    
  return (
    <div onChange={handleSort}>
        <input type="radio" value="asc" name="sortBy" defaultChecked={sortBy==="asc"} />
        <label>ASC</label>
        <input type="radio" value="dsc" name="sortBy" defaultChecked={sortBy==="dsc"} />
        <label>DSC</label>
    </div>
  )
}

export default Sort