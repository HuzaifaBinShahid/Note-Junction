import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';



const Login = () => {


  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });



  const handelLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })


    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      //Save auth-token and redirect to home page
      localStorage.setItem('token', json.authtoken);
      navigate("/")
    } else {
      alert("Invalid Credentials")
    }

  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }



  return (
    <div><form onSubmit={handelLogin}>
      <div className="form-group">
        <label htmlFor="Email">Email address</label>
        <input type="email" className="form-control" value={credentials.email} id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} />
        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" className="form-control" value={credentials.password} name='password' id="password" placeholder="Password" onChange={onChange} />
      </div>

      <button type="submit" className="btn btn-primary"> Login</button>
    </form></div>
  )
}


export default Login