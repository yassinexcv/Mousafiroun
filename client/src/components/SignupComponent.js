import React, { useState } from 'react'

function Register() {

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEamil] = useState("")

  async function register() {



    let item = { name, password, email }
    let emailExist = await fetch("http://localhost:8000/api/users/emailexist", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(item)
    })
    emailExist = await emailExist.json();
    console.warn(emailExist)


    if (emailExist.emailExist === true) {
      alert("Email already exist")
    } else {
      let result = await fetch("http://localhost:8000/api/users", {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"

        }

      })
      if (result.status === 200) {

        result = await result.json();
        localStorage.setItem("user-info", JSON.stringify(result))
        console.warn("result", result)
        alert("data has been saved")
      }
    }
  }

  return (

    <div className='col-sm-6 offset-sm-3'>

      <h1>Register</h1>

      <input type='text' value={name} onChange={e => setName(e.target.value)} placeholder='name' className='form-control' />
      <br />
      <input type='text' value={email} onChange={e => setEamil(e.target.value)} placeholder='email' className='form-control' />
      <br />
      <input type='text' value={password} onChange={e => setPassword(e.target.value)} placeholder='password' className='form-control' />
      <br />

      <button className='btn btn-primary' onClick={register}>Register</button>


    </div>


  )

}

export default Register