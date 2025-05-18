import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';



function form() {
  const [time,setTime] =useState('');
  const [description,setDescription] =useState('');
  const navigate = useNavigate();


  async function handleSubmit(event){
       event.preventDefault();

    const api_url = "http://localhost:5000/api/task";

      const save_task = await axios.post(api_url,{description:description,time:time});

      if(save_task){
        alert("task success fully saved");
        navigate('/table')
      }
      else{
        alert("something goes wrong")
      }
      setDescription('');
      setTime('');
    
  }
    
   

  function handleDescription(input){
      
    setDescription(input.target.value)
   }
   
  function handleTime(input){
    setTime(input.target.value)
  }
    
  return (
    <div>
      
       
      <div className='container rounded p-5  w-50 mt-5 bg-light border border-info'>      
        <h1 className='text-info' style={{textAlign:"center",fontFamily:"cursive"}}>task Manage</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="description" className='text-info' style={{fontFamily:"cursive"}}>description</label>
     <textarea name='description' placeholder='description' className='border border-info rounded w-100 mt-1'  onChange={handleDescription} value={description}></textarea>
     <label htmlFor="time" className='text-info'style={{fontFamily:"cursive"}}>time</label>
     <input type="number" name='time' placeholder='time' className='border border-info rounded w-100 mt-1'  onChange={handleTime} value={time}/>
     <button className='text-light p-2 border border-light rounded bg-info  w-100 mt-5' style={{fontFamily:"revert", fontSize:"24px"}}>save</button>
      </form>

    </div>
    </div>

  )
}

export default form
