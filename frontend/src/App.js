import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const getTask=()=>{
    fetch("http://localhost:8000/tasks")
      .then((res) => res.json())
      .then((res) => setTask(res));
  }
  const initValue ={
    "title":"",
    "subTask":""
  }
  const [task, setTask] = useState([]);
  const [taskInput, setTaskInput] = useState(initValue)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskInput({
      ...taskInput,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
      fetch("http://localhost:8000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskInput),
      })
      .then(e=>console.log("okay"))
      setTaskInput(initValue)
      getTask()
    
  };
  const handleDelete=(id)=>{
    fetch(`http://localhost:8000/tasks/${id}`,{
      method:"DELETE"
    })
    getTask()
  }

  useEffect(() => {
    getTask()
  }, []);
  return (
    <div style={{ fontSize: "25px", justifyContent: "center" }}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title: </label>
          <input autoFocus type="text" value={taskInput.title} onChange={handleChange} name="title" />
        </div>
        <div>
          <label>SubTask: </label>
          <input type="text" value={taskInput.subTask} onChange={handleChange} name="subTask" />
        </div>
        <input type="submit" />
      </form>
      <hr/>
      <a href="/"><button onClick={getTask}>Home</button></a>
      <hr />
      <table style={{border:"1px solid red",margin:"auto"}}>
        <thead>
          <tr>
            <td style={{border:"1px solid black", width:"400px"}}>id</td>
            <td style={{border:"1px solid black", width:"200px"}}>Title</td>
            <td style={{border:"1px solid black", width:"200px"}}>Status</td>
            <td style={{border:"1px solid black", width:"200px"}}>Subtask</td>
            <td style={{border:"1px solid black", width:"100px"}}>Edit</td>
            <td style={{border:"1px solid black", width:"100px"}}>Delete</td>
          </tr>
        </thead>
        <tbody>
          {task?.map((e)=>{
            return(
              <tr key={e._id}>
                <td style={{border:"1px solid black"}}>
                    <a href={`/${e._id}`}>{e._id}</a>
                </td>
                <td style={{border:"1px solid black"}}>
                    {e.title}
                </td>
                <td style={{border:"1px solid black"}}>
                    {e.status?"Completed":"Pending"}
                </td>
                <td style={{border:"1px solid black"}}>
                    {e.subTask? e.subTask:"Not SubTask"}
                </td>
                <td style={{border:"1px solid black"}}>
                  <button>Edit</button>
                </td>
                <td style={{border:"1px solid black"}}>
                  <button onClick={()=>handleDelete(e._id)}>Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
