import React, { useEffect, useState } from 'react'
import axios from 'axios'



function Reason() {
  const [open, setOpen] = useState(false)
  const [add, setAdd] = useState(false)
  const [description, setDescription] = useState('')
  const [time, setTime] = useState('')
  const [messages, setMessages] = useState('')
  const [tasks, setTasks] = useState([])
  const [updated, setUpdated] = useState(1)

  function setMessageFunc(message) {
    setMessages(message)
    setUpdated(Math.random())
    setDescription('')
    setTime('')
    setTimeout(() => setMessages(''), 5000)
  }

  async function fetchAlltasks() {
    let tasks = await axios.get('http://localhost:5000/api/task/')
    if(tasks.status === 200) {
      setTasks(tasks.data)
    }

  }

  useEffect(()=> {
    fetchAlltasks()
  }, [updated, ])

  async function sendAddData(e) {
    e.preventDefault()
    if (description === '' || time === '') {
      alert('all fields are required!');
    } else {

      try {
        const api_url = 'http://localhost:5000/api/task/'
        const send_data = await axios.post(api_url, { description: description, time: time })
        if (send_data.status === 200) {
          setMessageFunc(send_data.data.message)
        } else {
          setMessageFunc('Some thing Goes Wrong!')
          console.log(send_data)
        }

      } catch (error) {
        setMessageFunc(error.message)
      }

    }
  }

  function handleSetDescription(input) {
    setDescription(input.target.value)
  }

  function handleSetTime(input) {
    setTime(input.target.value)
  }

  return (
    <div>
      <div style={{ width: '100%', height: '50px', overflowWrap: 'wrap', background: '#F1f1f1', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#111' }}>
        {messages}
      </div>
      <div onClick={() => setOpen(!open)} className='container w-50 mt-5 p-3 rounded border border-success cursor-pointer' style={{cursor:"pointer", userSelect:"none"}}>
        <span className='text-success'>{open ? '▼' : '▶'}</span><span className='ms-2 text-success'>{new Date().toDateString()}</span>

        {open &&
          (
            <div style={{ position: 'relative', width: '100%', height: 'max-content', paddingTop: '10px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', width: '100%', height: 'max-content', display: 'flex', flexDirection: 'row' }}>
                <div style={{ position: 'relative', justifyContent: 'center', paddingBottom: '10px', alignItems: 'center', background: '#F1f1f1', width: '100%', height: 'max-content', paddingTop: '10px', display: 'flex', flexDirection: 'column' }}>Description</div>
                <div style={{ position: 'relative', justifyContent: 'center', paddingBottom: '10px', alignItems: 'center', background: '#F1f1f1', width: '100%', height: 'max-content', paddingTop: '10px', display: 'flex', flexDirection: 'column' }}>Time</div>
              </div>
              <div style={{ position: 'relative', width: '100%', height: 'max-content', paddingTop: '10px', display: 'flex', flexDirection: 'column' }}>
                <table border={'1px'} cellSpacing={10} style={{ maxWidth: '100%', overflowWrap: 'break-word' }}>
                  <tbody>
                    {
                      tasks.length > 0 ? (
                        tasks.map((value, index) => {
                          return (
                            <tr key={value._id}>
                              <td style={{ maxWidth: '20px', background: '#f2f2f2', padding: '10px' }}>{value.description}</td>
                              <td style={{ maxWidth: '6px', background: '#f2f2f2', padding: '10px' }}>{value.time}</td>
                            </tr>
                          )
                        })
                      ) : (
                        <tr>
                          <td colSpan={2}>No Tasks Available</td>
                        </tr>
                      )
                    }
                  </tbody>
                </table>
              </div>
            </div>
          )
        }

      </div>

     {open &&
     (
      <div className='container w-50 ms-25'>
      <button type='button' onClick={() => setAdd(!add)} className='btn btn-success rounded mt-3 '>Add</button>
    </div>
     )}

      {add && (
        <div className='container w-25 me-25'>
          <form action="" onSubmit={sendAddData}>
            <textarea type="text" name='description' value={description} onChange={handleSetDescription} placeholder='description' className='rounded mt-2 ms-1  w-100'></textarea><br></br>
            <input type="" name='time' onChange={handleSetTime} value={time} placeholder='time' className='rounded mt-2 ms-1  w-100' /><br></br>
            <button type='submit' className='btn btn-success rounded mt-4 ms-1 w-100 '>save</button>
          </form>
        </div>

      )

      }

    </div>
  )
}

export default Reason

