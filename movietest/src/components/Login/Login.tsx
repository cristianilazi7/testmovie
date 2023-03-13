import React, { useState, useEffect } from "react";
import '../../css/login.css'
import axios from '../../helper/my-module.mjs';
import { useCookies } from 'react-cookie';
const Login = () => {

        const _Urlapi = 'http://localhost:3200/auth';
        const [cookies, setCookie] = useCookies(['token']);
        const [password, setPassword] = useState('');
        const [email, setEmail] = useState("");
        const [passwordError, setpasswordError] = useState("");
        const [emailError, setemailError] = useState("");
      
        const handleValidation = () => {
          let formIsValid = true;
      
          if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
            formIsValid = false;
            setemailError("Email Not Valid");
            return false;
          } else {
            setemailError("");
            formIsValid = true;
          }
      
          if (!password.match(/^[a-zA-Z]{3,22}$/)) {
            formIsValid = false;
            setpasswordError(
              "Only Letters and length must best min 8 Chracters and Max 22 Chracters"
            );
            return false;
          } else {
            setpasswordError("");
            formIsValid = true;
          }
      
          return formIsValid;
        };
      
        const loginSubmit = (e: { preventDefault: () => void; }) => {
          e.preventDefault();
          handleValidation();
          console.log('email',email);
          console.log('password',password)
          iniciaSesion();
        };

        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        
        const params = new URLSearchParams();
        params.append('email', email);
        params.append('password', password);

       const iniciaSesion = async ()=> {
        console.log('email',email);
        console.log('password',password)
            await axios.post(_Urlapi, params, config)
                        .then(response => {
                            const { data } = response;
                            return data.Token;
                        }).then((result) => {
                            console.log(result);
                            setCookie('token', result, { path: '/' });
                            window.location.href='../app';
                        })
                        .catch(error => {
                            console.log(error)
                        });
        }

        return (
            <div className="containerPrincipal">
              <div className="containerSecundary">
                <div className="row d-flex justify-content-center">
                  <div className="col-md-12">
                    <form id="loginform" onSubmit={loginSubmit}>
                      <div className="form-group">
                        <label>Email address</label>
                        <input
                          type="email"
                          className="form-control"
                          id="EmailInput"
                          name="EmailInput"
                          aria-describedby="emailHelp"
                          placeholder="Enter email"
                          onChange={(event) => setEmail(event.target.value)}
                        />
                        <small id="emailHelp" className="text-danger form-text">
                          {emailError}
                        </small>
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="Password"
                          onChange={(event) => setPassword(event.target.value)}
                        />
                        <small id="passworderror" className="text-danger form-text">
                          {passwordError}
                        </small>
                      </div>
                      
                     <div className="submitbtn">
                     
                     <button type="submit" className="btn btn-primary">
                        Login
                      </button>
                     </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          );
    
}

export default Login;