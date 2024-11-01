import { NavLink, Outlet, useLoaderData } from "react-router-dom"
import { useState, useEffect, createContext } from "react";

export const userContext = createContext()

export default function NavLayout() {

    // ! Set Article to Most Recent //
    const articles = useLoaderData()
    let length = articles.length - 1
    let newArticle = articles[length]._id
    const [sidebarOpen, setSidebarOpen] = useState(false)
    let shirt;
    useEffect(() => {
        const getData = async () => {
            const jsonRequest = await fetch('/src/shirtswap.json')
            const randomShirt = await jsonRequest.json()
            shirt = randomShirt[Math.floor(Math.random() * randomShirt.length)]
        }
        getData()
    })

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || '')
    let adminPermisson = user.admin
    let ownerPermission = user.owner
    useEffect(() => {
        setAdmin(adminPermisson)
        setOwner(ownerPermission)
    }, [user]);

    const [admin, setAdmin] = useState(false)
    const [owner, setOwner] = useState(false)
    const [displayedShirt, setDisplayedShirt] = useState(shirt)

    function handleLogin(e) {
        e.preventDefault()
        const data = new FormData(e.target)
        const userLogin = {}
        for (const info of data) {
            userLogin[info[0]] = info[1]
        }

        fetch('http://localhost:4000/users', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(userLogin),
            headers: {
                'content-type': 'application/json'
            }

        }).then(res => res.json()).then(data => {
            let userinfo = data
            setUser(data)
            let loggedInUserInfo = localStorage.setItem('user', JSON.stringify(userinfo))
            if(userinfo.owner === true) {
                setOwner(true)
            }
            if(userinfo.admin === true) {
                setAdmin(true)
            }
            if (data.message != 'incorrect login') {
                document.getElementById('loginId').value = ''
                document.getElementById('loginPasswrd').value = ''
                document.getElementById('incorrectLogin').style.display = 'none'
                closeNav()
            } else if (data.message === 'incorrect login') {
                document.getElementById('loginId').value = ''
                document.getElementById('loginPasswrd').value = ''
                document.getElementById('incorrectLogin').style.display = 'block'
            }
        })
    }


    function forgotPassword() {
        document.getElementById('updatePassword').style.display = 'block'
    }
    function handleNewPassword(e) {
        e.preventDefault()

        const data = new FormData(e.target)
        const newPassword = {}
        for (const info of data) {
            newPassword[info[0]] = info[1]
        }

        fetch('http://localhost:4000/users', {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(newPassword),
            headers: {
                'content-type': 'application/json'
            }
        }).then(res => res.json()).then(data => {
            console.log(data.message)
            if (data.message === 'Incorrect Information') {
                document.getElementById('updatePassword').style.display = 'block'
                document.getElementById('tryAgain').style.display = 'block'
                document.querySelectorAll('.forgotPassword').forEach((element) => {
                    element.style.backgroundColor = 'red';
                })
            } if (data.message === 'Correct Information') {
                document.querySelectorAll('.forgotPassword').forEach((element) => {
                    element.value = '';
                    element.style.backgroundColor = 'white'
                })
                document.getElementById('updatePassword').style.display = 'none'
            }
        })
        document.getElementById('updatePassword').style.display = 'none'
    }

    function openNav(e) {
        setSidebarOpen(true)
        setDisplayedShirt(shirt)
        document.getElementById("mySidenav").style.width = "250px";
        let Background = document.getElementById("root")
        Background.classList.add('darken');
        e.target.style.display = 'none';
    }

    function closeNav() {
        setSidebarOpen(false)
        document.getElementById("mySidenav").style.width = "0";
        let but = document.getElementById("main");
        but.style.marginLeft = "0";
        but.classList.remove('opened');
        let Background = document.getElementById("root")
        Background.classList.remove('darken');
        document.getElementById('opennav').style.display = 'block';
    }
    return (
        <>
            <nav>
                <div id="mySidenav" className="sidenav">
                    <div href="" className="closebtn" onClick={closeNav}>&times;</div>
                    <NavLink onClick={closeNav} to='/'>Home</NavLink>
                    <NavLink onClick={closeNav} to='/blogpage'>Blogs Page</NavLink>
                    <NavLink onClick={closeNav} to={`articlepage/${newArticle}`}>News Articles</NavLink>
                    <NavLink onClick={closeNav} to='medicalpage/psilocybin/psilocybinstatistics'>Medical Research</NavLink>
                    <NavLink onClick={closeNav} to='decriminalizepage'>Decriminalize</NavLink>
                    <NavLink onClick={closeNav} to='help'>Company Info</NavLink>
                    {!admin ? null : <NavLink onClick={closeNav} to='admin/psilocybinadmin'>Admin Page</NavLink>}

                    <div id='shroomiesAd'>
                        <h4>Buy Now</h4>
                        <img id='adImg' src={displayedShirt} alt="help" />
                        <a href="#"><h4>ShroomiesBrand.Co</h4></a>
                    </div>
                    <div id='loginContainer'>
                        <header id="incorrectLogin">Username or Password Incorrect</header>
                        <span>Welcome: {user.username ? <span>{user.username}</span> : <span>Guest</span>}</span>
                        <form onSubmit={handleLogin}>
                            <input className="loginUser" id="loginId" name="username" type="text" placeholder='User Name...' />
                            <input id="loginPasswrd" className="loginPasswrd" name="password" type="password" placeholder='PassWord...' />
                            <div id="loginOptions">
                                <button><a>Login-</a></button>
                                <button><NavLink onClick={closeNav} to='register'>Register-</NavLink></button>
                                <button onClick={forgotPassword} ><a> Forgot</a></button>
                            </div>
                        </form>
                        <hr />
                        <h2 id="requiredSignIn">You Must Login To Post, Comment, & Like Blogs.</h2>
                        <form id="updatePassword" onSubmit={handleNewPassword}>
                            <div id="tryAgain">
                                <p>Information Incorrect</p>
                                <p>Check Spelling / Case Sensitive</p>
                            </div>
                            <input type="text" name='username ' placeholder='Enter User Name...' />
                            <input type="text" name='fname' placeholder="Enter First Name..." />
                            <input type="text" name='lname' placeholder="Enter Last Name..." />
                            <input type="text" name='email' placeholder="Enter Email..." />
                            <input className="loginPasswrd" name="password" type="password" placeholder='Enter New PassWord...' />
                            <div id="loginOptions">
                                <button>Submit Change</button>
                            </div>
                        </form>
                    </div>
                </div>
            </nav>
            <div id="main">
                <span id="opennav" style={{ fontSize: 30, cursor: 'pointer' }} onClick={openNav}>&#9776;</span>
            </div>
            <userContext.Provider value={{ user, setUser, sidebarOpen, owner }}>
                <Outlet />
            </userContext.Provider>
            <footer>
                <h3>CopyWrite: Shroomies Brand 2024</h3>
                <div id="socialLinks">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                    </svg>
                </div>
            </footer>
        </>
    )
}

export const navArticlesLoader = async () => {
    const res = await fetch('http://localhost:4000/newshome')
    const articlesarray = await res.json()
    return articlesarray
}

