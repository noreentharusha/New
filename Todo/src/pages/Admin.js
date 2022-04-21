import React,  {useState, useEffect}from 'react'
import Axios from 'axios'
import './Admin.css'
import Button from '@material-ui/core/Button';

function Admin() {
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

  const deleteUser=(id) =>{
    

    Axios.delete(`http://localhost:1337/delete/${id}`).then(()=>{
      setListOfUsers(listOfUsers.filter((val)=>{
        return val._id !== id;
      }))
    });
      
  }
    
  return (
    <div className="admin">
      <h1> Admin Dashboard  </h1>
       {listOfUsers.map((val)=>{
         return (
           <div className="admin__container">

            <div className="admin__element">
            <h3>Name:{val.name}</h3>
            <h3>Email:{val.email}</h3>
            <h3>Password:{val.password}</h3>
            </div>

            <div className ="admin__edit">
            <Button variant="contained" color="primary" onClick={()=>{updateUser(val._id)}}>Update</Button>
            <Button  variant="contained" color="secondary" onClick={()=>{deleteUser(val._id)}}>Delete</Button>
            </div>

           </div>
         
         );
       })}
       
    </div>
  )
}

export default Admin