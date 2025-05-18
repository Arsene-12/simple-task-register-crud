import React from 'react'
import Form from'./components/form'
import Table from'./components/table'
import {BrowserRouter, Routes ,Route} from 'react-router-dom'


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element ={<Form/>}/>
        <Route path='/table' element ={<Table/>}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  )
}


export default App
