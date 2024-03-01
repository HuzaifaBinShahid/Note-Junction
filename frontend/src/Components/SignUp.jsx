import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {

  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });



  const handelSignUp = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify({ name, email, password })


    });

    const json = await response.json();
    console.log(json);
   if(json.success){
    localStorage.setItem('token', json.authtoken)
    navigate("/login")
    props.showAlert("Account Created successfully" , "success")
   }else{
    props.showAlert("Inavlid Credentials" , "danger")
   }


  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <h2>SIGN UP</h2>
      <form onSubmit={handelSignUp}>
      <div className="form-group">
        <label htmlFor="Name">Name</label>
        <input type="text" className="form-control"  id="name" name="name" placeholder="Enter Your Name" onChange={onChange} required/>

      </div>
      <div className="form-group">
        <label htmlFor="Email">Email</label>
        <input type="email" className="form-control"  name='email' id="email" placeholder="Enter your Email" onChange={onChange} required/>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" className="form-control"  name='password' id="password" placeholder="Password" onChange={onChange} minLength={5} required />
      </div>
      <div className="form-group">
        <label htmlFor="cpassword">Confirm Password</label>
        <input type="password" className="form-control" name="cpassword" id="cpassword" placeholder="Password" onChange={onChange} minLength={5} required />
      </div>

      <button type="submit" className="btn btn-primary">SignUp</button>
    </form></div>
  )
}

export default SignUp