/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'
import { useState } from 'react'
import "../styles/auth.css"
import axios from "axios"


const Auth = () => {
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    if (localStorage.getItem("token")) {
        window.location.href = "/"
    }


    const signup = (e) => {
        e.preventDefault()
        axios.post("https://sbshackathon.herokuapp.com/api/auth/signup", {
            username,
            email,
            password  
        }).then((res) => {
            if (res.data && res.data.token) {
                localStorage.setItem("token", res.data.token)
                window.location.href = "/"
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const login = (e) => {
        e.preventDefault()
        axios.post("https://sbshackathon.herokuapp.com/api/auth/login", {
            email,
            password
        }).then((res) => {
            if (res.data && res.data.token) {
                localStorage.setItem("token", res.data.token)
                window.location.href = "/"
            }
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');

        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
        });

        signInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
        });
    })
    return (
        <div className="body">
            <div class="auth-container" id="container">
                <div class="form-container sign-up-container">
                    <form action="#" className='authForm'>
                        <h1>Create Account</h1>
                        <div class="social-container">
                            <a href="#" class="social autha"><i class="fab fa-facebook-f"></i></a>
                            <a href="#" class="social autha"><i class="fab fa-google-plus-g"></i></a>
                            <a href="#" class="social autha"><i class="fab fa-linkedin-in"></i></a>
                        </div>
                        <input type="text" placeholder="Name" className='authInput' onChange={(e) => setUsername(e.target.value)} />
                        <input type="email" placeholder="Email" className='authInput' onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" className='authInput' onChange={(e) => setPassword(e.target.value)} />
                        <button className='authButton' onClick={signup}>Sign Up</button>
                    </form>
                </div>
                <div class="form-container sign-in-container">
                    <form action="#" className='authForm'>
                        <h1 className='authh1'>Sign in</h1>
                        <div class="social-container">
                            <a href="#" class="social autha"><i class="fab fa-facebook-f"></i></a>
                            <a href="#" class="social autha"><i class="fab fa-google-plus-g"></i></a>
                            <a href="#" class="social autha"><i class="fab fa-linkedin-in"></i></a>
                        </div>
                        <input type="email" placeholder="Email" className='authInput' onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" className='authInput' onChange={(e) => setPassword(e.target.value)} />
                        <a href="#" className='autha'>Forgot your password?</a>
                        <button className='authButton' onClick={login}>Sign In</button>
                    </form>
                </div>
                <div class="overlay-container">
                    <div class="overlay">
                        <div class="overlay-panel overlay-left">
                            <h1 className='authh1'>Welcome Back!</h1>
                            <p className='authp'>To keep connected with us please login with your personal info</p>
                            <button class="ghost authButton" id="signIn">Sign In</button>
                        </div>
                        <div class="overlay-panel overlay-right">
                            <h1 className='authh1'>Hello, Friend!</h1>
                            <p className='authp'>Enter your personal details and start journey with us</p>
                            <br></br>
                            <button class="ghost authButton" id="signUp">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth