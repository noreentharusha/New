import React from 'react'
import { BrowserRouter , Route, Routes} from "react-router-dom";
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'

const App = () => {




	return (
		<div>
			<BrowserRouter>
			<Routes>
			<Route path='/login' element= {<Login/>}/>
			<Route path='/register' element= {<Register/>}/>
			<Route path='/dashboard' element= {<Dashboard/>}/>
			<Route path='/admin' element= {<Admin/>}/>
	
			</Routes>
			
			</BrowserRouter>
		</div>
	)
		
		

	
}

export default App