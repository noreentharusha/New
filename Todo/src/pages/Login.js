import React, {useState} from 'react'
import "./Login.css";



function Login() {
	
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	

	async function loginUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:1337/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})

		const data = await response.json()

        if (data.user) {
			//localStorage.setItem('token', data.user)
			alert("Login successful")
			if(email==="admin@admin"){
				window.location.href = '/admin'
			}else{
				
				window.location.href = '/dashboard'
			}
		    
	
		} else {
			alert('Please check your username and password')
		}



		

	}

	return (
		
		 
		 <div className="login">
		   
		   <div className="login__container">
		   <h1>Login</h1>
		   <form onSubmit={loginUser}>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="Email"
				/>
				<br />
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
				/>
				<br />
				<input type="submit" value="Login" className="login__Button"/>

			</form>

		   </div>

		   

		 </div>

	)
}

export default Login