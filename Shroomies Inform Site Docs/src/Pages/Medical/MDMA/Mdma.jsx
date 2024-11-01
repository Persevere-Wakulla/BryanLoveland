import { Outlet, NavLink, useLoaderData } from "react-router-dom"
import React, { useContext } from 'react'
import { userContext } from "../../../layouts/NavLayout"

export default function Mdma() {

    const { user, setUser, sidebarOpen } = useContext(userContext)
    const mdma = useLoaderData()
    
    return (
                <div className={sidebarOpen ? 'reduceContainer' : ''} id='newsDescrip'>
                     <div id="psychedelicHeader">
                    <div id="psychedelicHeaderTitle">
                        <h1 >MDMA</h1>
                        <NavLink to='mdmabenefits'>Benefits</NavLink>
                        <span id='lineSpace' > /  </span>
                        <NavLink to='mdmastatistics'>Statistics</NavLink>
                        <span id='lineSpace' > /  </span>
                        <NavLink to='mdmaStatus'>Status</NavLink>
                    </div>
                </div>
                <Outlet />
                </div>
    )}
export const mdmaLoader = async () => {
    const res = await fetch('http://localhost:4000/mdmahome')
    const mdmaarray = await res.json()
    return mdmaarray
}
