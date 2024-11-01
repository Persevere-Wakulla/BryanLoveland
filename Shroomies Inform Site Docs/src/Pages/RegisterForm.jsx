import { useState } from "react"
import { Placeholder } from "react-bootstrap"
import { useNavigate } from "react-router"
import { useContext } from "react"
import { userContext } from "../layouts/NavLayout"

export default function RegisterForm() {

    const { setUser } = useContext(userContext)
    let navigate = useNavigate()
   
    async function handleSubmit(e) {
        e.preventDefault()

        const data = new FormData(e.target)
        const userInfo = {owner: false, admin: false, recommended: [] }
        for (const info of data) {
            userInfo[info[0]] = info[1]
        }
        await fetch('http://localhost:4000/users/register', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        }).then(res => res.json()).then(data => {
            console.log(data.message)
            if (data.message === 'email') {
                document.getElementById('email').value = ''
                document.getElementById('email').classList.add('errored')
                document.getElementById('email').setAttribute('placeholder', 'Email Already Used')
                document.getElementById("email").style.backgroundColor = 'red'
            }
            else if (data.message === 'username') {
                document.getElementById('userName').value = ''
                document.getElementById('userName').classList.add('errored')
                document.getElementById('userName').setAttribute('placeholder', 'Username Already Used')
                document.getElementById("userName").style.backgroundColor = 'red'
            }
            else {
                let registeredUser = userInfo
                localStorage.setItem('user', JSON.stringify(registeredUser))
                setUser(JSON.parse(localStorage.getItem('user')))
                navigate('/')
            }
        })}

    function backgroundColor() {
        document.getElementById("email").style.backgroundColor = 'white'
    }
    function username(e) {
        document.getElementById("userName").style.backgroundColor = 'white'
    }

    return (
        <div id="adminLayout">
                <h1 id="registerFormHeader" htmlFor="">Please Register To Post, Comment, & Like Blogs</h1>
            <div id="formContainer">
                 <form  onSubmit={handleSubmit}  >
                <input type="text" name="fname" placeholder="First Name..." required />
                <input type="text" name="lname" placeholder="Last Name..." required />
                <input onChange={backgroundColor} id="email" type="text" name="email" placeholder="Email..." required />
                <input onChange={username} id="userName" type="text" name="username" placeholder="New User Name..." required />
                <input id="regpaswrd" type="password" name="password" placeholder="Password..." required />
                <br />
                <button className="allBtns">Submit</button>
            </form></div>
                

        </div>
    )}
