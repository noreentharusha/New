import React, {useState} from 'react'
import './Register.css'




const App = () => {

	
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function registerUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:1337/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				password,
			}),
		})
		const data = await response.json()
		console.log(data)
		if (data.status === 'ok') {
		
			window.location.href = '/login'
		}

		

	}

	

	return (
		
		 
		 <div className="register">
		    <div className='register__container'>
			<form onSubmit={registerUser}>
			<h1>Register</h1>
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					type="text"
					placeholder="Name"
				/>
				<br />
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
				<input type="submit" value="Register"  className="register__button"/>
			</form>
			</div>

			
			
			

		 </div>

	)
}

export default App