import React,  {useState, useEffect}from 'react'
import Axios from 'axios'
import './Dashboard.css'
import Button from '@material-ui/core/Button';



function Dashboard() {
  
  const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
  const[listOfUsers,setListOfUsers] = useState([])

 

  useEffect(() => {
    Axios.get("http://localhost:1337/read",{
    name:name,
    email:email,
    password:password})
    .then((response)=>{
      setListOfUsers(response.data)
    })
    .catch(()=>{
      console.log('error')

    });
  
   
  }, [])
  
  const updateUser=(id) =>{
    const newPassword = prompt("Enter new password: ")

    Axios.put('http://localhost:1337/update',{newPassword: newPassword, id: id}).then(()=>{
      setListOfUsers(listOfUsers.map((val)=>{
        return val._id=== id?{_id: id, name: val.name, email:val.email, password: newPassword}: val
      }))
    })
  }

  
    
  return (
    <div className="dashboard">
      <h1> User Dashboard  </h1>
       {listOfUsers.map((val)=>{
         return (
           <div className="dashboard__container">

            <div className="dashboard__element">
            <h3>Name:{val.name}</h3>
            <h3>Email:{val.email}</h3>
            <h3>Password:{val.password}</h3>
            </div>

            <div className ="dashboard__edit">
            <Button variant="contained" color="primary" onClick={()=>{updateUser(val._id)}}>Update</Button>
            
            </div>

           </div>
         
         );
       })}
       
    </div>
  )
}

export default Dashboard