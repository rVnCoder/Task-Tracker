import {useState,useEffect} from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'


const  App = () => {
  const [showAddNew,setshowAddNew]=useState(false)
  const [tasks,setTasks]=useState([
    
  ])
  useEffect(
    ()=>{
      const getTasks= async () => {
        const tasksFromServer = await fetchtasks()
        setTasks(tasksFromServer)
      }
      getTasks()
    },[])

  // fetch tasks
  const fetchtasks = async ()=>{
    const res=await fetch('http://localhost:5000/tasks')
    const data =await res.json()
    return data
  }
  // fetch task
  const fetchtask = async (id)=>{
    const res=await fetch(`http://localhost:5000/tasks/${id}`)
    const data =await res.json()
    return data
  }
  // add task 
  const addTask= async (task)=>{
    const res= await fetch('http://localhost:5000/tasks',{
      method :'POST',
      headers :{
        'Content-type':'application/json',
      },
      body : JSON.stringify(task),
    })
    const data =await res.json()
    setTasks([...tasks,data])
    // const id=Math.floor(Math.random()*10000)+1
    // const newTask={id,...task}
    // setTasks([...tasks,newTask])
  }
  // delete a task
  const deleteTask= async (id)=>{
    await fetch (`http://localhost:5000/tasks/${id}`,{method : 'DELETE',})
    setTasks(tasks.filter(
      (task)=>task.id !==id
      ))
  }
  //toggle remainder
  const toggleReminder=async (id)=>{
    
      const taskToToggle=await fetchtask(id)
      const updTask={...taskToToggle,reminder:!taskToToggle.reminder}
      const res=await fetch(`http://localhost:5000/tasks/${id}`,{
        method :'PUT',
        headers :{
          'Content-type':'application/json',
        },
        body : JSON.stringify(updTask),
      })
      const data =await res.json()
      setTasks(tasks.map((task)=>task.id===id ? {...task,reminder : data.reminder} : task))
  
    // setTasks(tasks.map((task)=>task.id===id ? {...task,reminder : !task.reminder} : task))
  }
  return (
    <Router>
    <div className='container'> 
        <Header onAddNew={()=>setshowAddNew(!showAddNew)} showAdd={showAddNew}/> 
        {showAddNew && <AddTask onAdd={addTask} />}
        {tasks.length >0 ?(<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>) :("No Tasks To Show")}
        {/* <Route path='/about' Component={About} /> */}
        <Footer />
    </div>
    </Router>
  
  )
}


export default App;
