
import React, { useState, useEffect } from 'react';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router'





function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  

  async function login(e) {
    e.preventDefault();
    setLoading(true);
    let item = { email, password }

    let result = await fetch("http://localhost:8000/api/users/login", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(item)
    })
    if (result.status === 200) {
      result = await result.json();
      localStorage.setItem("user-info", JSON.stringify(result))
      setLoading(false);
      navigate("/home")
      console.log(result)
    }
    else {
      toast.error("Please check your email and password")
      navigate("/sign-in")
    }
  }

  return (
    <div>

      <h1>Login Page</h1>
      <div className="col-sm-6 offset-sm-3">
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="email" />
        <br />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="password" />
        <br />
        <button onClick={login} className="btn btn-primary">Login</button>
      </div>
    </div>
  );
}



export default Login ;



