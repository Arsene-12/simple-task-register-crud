
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function table() {
  const [respons, setRespons] = useState('');
  const [openUpdate, setOpenUpdate] = useState(null);
  const [value, setValue] = useState({ decription: '', time: '' });
  const navigate = useNavigate();

  const [update_desc, setUpdateDesc] = useState('');
  const [update_time, setUpdateTime] = useState('');
  const [update_id, setUpdateId] = useState(null);
  const [is_updated, setIsUpdated] = useState(false);

  function handleView() {
    navigate('/')
  }


  async function get_tasks() {
    const get_task = await axios.get("http://localhost:5000/api/task");
    setRespons(get_task.data);
  }
  useEffect(() => {
    get_tasks();
  },);


  async function handleDelete(id, time) {

    const confirmdelet = confirm(`delete permanent this task has time:${time}`);

    if (confirmdelet) {

      const delete_task = await axios.delete(`http://localhost:5000/api/task/${id}`)

    }

  }

  async function handleUpdate() {
    const update_P = document.getElementById("update_P");

    const update = await axios.put(`http://localhost:5000/api/task/${update_id}`, { description: update_desc, time: update_time });

    update_P.innerHTML = "update loading ... still in proccess";

    if (update.status === 200) {
      update_P.innerHTML = "Data updated successfully.";
      setIsUpdated(Math.random());
      setTimeout(() => {
        update_P.innerHTML = ''
      }, 4000)
    } else {

      update_P.innerHTML = "Failed!";
      setTimeout(() => {
        update_P.innerHTML = ''
      }, 4000)

    }
  }

  return (
    <div>
      <p className='text-info' style={{ fontFamily: "monospace", fontSize: "12", textAlign: "center" }} id='update_P'></p>
      {openUpdate &&
        (
          <div className='container rounded p-5  w-50 mt-5 bg-light border border-info'>
            <h1 className='text-info' style={{ textAlign: "center", fontFamily: "cursive" }}>task Update</h1>
            <form onSubmit={async (event) => {
              event.preventDefault();

              await handleUpdate();

              setOpenUpdate(null);
            }}>
              <label htmlFor="description" className='text-info' style={{ fontFamily: "cursive" }}>description</label>
              <textarea name='description' value={update_desc} placeholder='description' className='border border-info rounded w-100 mt-1' onChange={(input) => {
                setUpdateDesc(input.target.value);
              }} ></textarea>
              <label htmlFor="time" className='text-info' style={{ fontFamily: "cursive" }}>time</label>
              <input type="number" name='time' value={update_time} placeholder='time' className='border border-info rounded w-100 mt-1' onChange={(input) => {
                setUpdateTime(input.target.value);
              }} />
              <button className='text-light p-2 border border-light rounded bg-info  w-100 mt-5' style={{ fontFamily: "revert", fontSize: "24px" }}>save</button>
            </form>

          </div>
        )}
      <div className='container rounded p-5  w-75 mt-5 bg-light border border-info'>
        <table border={'1px'} className='border border-info w-100 p-5' style={{ borderRadius: "30px" }}>
          <thead className='text-light bg-info p-5' style={{ height: "50px", textAlign: "center", fontFamily: "monospace", fontSize: "20px" }}>
            <tr>
              <td>Description</td>
              <td>time</td>
              <td>actions</td>
            </tr>
          </thead>
          <tbody style={{ textAlign: "center", fontFamily: "cursive", fontSize: "20px" }}>
            {
              respons.length > 0 ?
                (
                  respons.map((value, index) => {
                    return (
                      <tr key={value._id}>
                        <td>{value.description}</td>
                        <td>{value.time}</td>
                        <td>
                          <div className='d-flex w-100 col-md-6' style={{ justifyContent: "center", alignContent: "center" }}>
                            <button className='rounded bg-info text-light border border-info mt-2' style={{ fontFamily: "revert", width: "7rem" }} onClick={() => {
                              setOpenUpdate(!openUpdate);

                              setUpdateId(value._id);
                              setUpdateDesc(value.description);
                              setUpdateTime(value.time);
                            }}><i className='fas fa-edit' >edit</i></button>
                            <button className='rounded  bg-danger text-light border border-danger mt-2 ms-2' style={{ fontFamily: "revert", width: "7rem" }} onClick={() => handleDelete(value._id, value.time)}><i className='fas fa-trash' >delete</i></button>
                          </div>
                        </td>
                      </tr>
                    )
                  })) :
                (
                  <tr><td colSpan={2}>there no tasks</td></tr>
                )
            }
          </tbody>
        </table>
      </div>
      <button onClick={handleView}>Add Task</button>


    </div>


  )
}

export default table
