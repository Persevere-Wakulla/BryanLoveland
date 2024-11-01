import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../../layouts/NavLayout";


export default function Admin() {

    const { owner } = useContext(userContext)
        const [users, setUsers] =useState()

    return (
            <div id="adminLayout">
                <div id="adminHeader">
                <NavLink to='psilocybinadmin'>Psilocybin </NavLink><span>/</span>
                <NavLink to='mdmaadmin'> Mdma </NavLink><span>/</span>
                <NavLink to='medicaladmin'> Medical </NavLink><span>/</span>
                <NavLink to='newsadmin'> News </NavLink><span>/</span>
                <NavLink to='petitionreq'> Petition Requests </NavLink><span>/</span>
                {!owner ? null : <NavLink to='registeredusers' setUsers={setUsers}> Registered Users <span>/</span></NavLink>}
                <NavLink to='blogreview'> Blog Review</NavLink>
            </div>
            <Outlet  />
        </div>
    )}