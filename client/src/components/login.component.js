import React, { Component } from 'react'


// function login() {
//     console.log("hello")
//     // var myHeaders = new Headers();
//     // myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
//     // var urlencoded = new URLSearchParams();
//     // urlencoded.append("email", "user@user.user");
//     // urlencoded.append("password", "123456");
    
//     var requestOptions = {
//       method: 'POST',
//       body: {email,password}
//     };
    
//     fetch("http://localhost:6000/api/users/login", requestOptions)
//       .then(response => response.text())
//       .then(result => console.log(result))
//       .catch(error => console.log('error', error));
    
// }

export default class Login extends Component {

  render() {
    return (
      <form >
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input 
          onChange={e => this.setState({ password: e.target.value })}
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
        <p>
            Don't have an account? <a href="/sign-up">Sign up</a>
        </p>
      </form>
    )
  }
}