import { Outlet, NavLink, useLoaderData } from "react-router-dom"
import React, { useContext } from 'react'
import { userContext } from "../../../layouts/NavLayout"

export default function Psilocybin() {

    const { user, setUser, sidebarOpen } = useContext(userContext)
    const psilocybin = useLoaderData()
    
    return (
            <div className={sidebarOpen ? 'reduceContainer' : ''} id='newsDescrip'>
                <div id="psychedelicHeader">
                <div id="psychedelicHeaderTitle"><h1 >PsilocybiN</h1>
                <NavLink to='psilocybinbenefits'> Benefits</NavLink>
                <span id='lineSpace' > /  </span>
                <NavLink to='psilocybinstatistics'>Statistics</NavLink>
                <span id='lineSpace' > /  </span>
                <NavLink to='psilocybinstatus'>Status</NavLink></div>
            </div>
            <Outlet />
            </div>
    )}
export const psilocybinLoader = async () => {
    const res = await fetch('http://localhost:4000/psilocybinhome')
    const psilocybinarray = await res.json()

    return psilocybinarray
}
