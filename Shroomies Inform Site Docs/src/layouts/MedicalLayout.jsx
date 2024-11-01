import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom'
import { useLoaderData, Link, NavLink } from 'react-router-dom'



export default function MedicalLayout() {
  
    const medical = useLoaderData()
    const [filteredItem, setFilteredItem] = useState('')
    function filterName(e) {
        setFilteredItem(e.target.value)
    }

    return (
        <div id='newsMain'>
            <div id='newsGrid'>
     <div className="dropdown">
         <button className="dropbtn">Additional Reading</button>
          <div className="dropdown-content">
     <div id='psychedelicLinks'>
                    <NavLink to='mdma/mdmastatistics'>MDMA INFORMATION</NavLink>
                    <br />
                    <NavLink to='psilocybin/psilocybinstatistics'>PSILOCYBIN INFORMATION</NavLink>
                    <br />
                    <NavLink to='treatmentlocations'>Treatment Locations</NavLink>
                </div>
            <div id='searchContainer'>
                        <input onChange={filterName} type="text" placeholder='Search News...' />
                    </div>
                    <div id='articleTitles'>
                    {medical.filter(item => {
                        if (filteredItem === '') {
                            return item
                        }
                        return item.title.toLowerCase().includes(filteredItem)
                    }).map(index => (
                        <Link to={index._id} key={index.title}>
                            <div id='articlesList'>
                                <h4>{index.title}</h4>
                            </div>
                        </Link>
                    ))}
                </div>
                    </div>
               </div> 
            <Outlet />
            <div id='newsDescripList'>
                <div id='psychedelicLinks'>
                    <NavLink to='mdma/mdmastatistics'>MDMA INFO</NavLink>
                    <br />
                    <NavLink to='psilocybin/psilocybinstatistics'>PSILOCYBIN INFO</NavLink>
                </div>
                <div id='searchContainer'>
                    <input onChange={filterName} type="text" placeholder='Title Search...'/>
                </div>
                <div id='articleTitles'>
                    {medical.filter(item => {
                        if (filteredItem === '') {
                            return item
                        }
                        return item.title.toLowerCase().includes(filteredItem)
                    }).map(index => (
                        <Link to={index._id} key={index.title}>
                            <div id='articlesList'>
                                <h4>{index.title}</h4>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
        </div>
    )}
export const medicalLoader = async () => {
    const res = await fetch('http://localhost:4000/medicalhome')
    const medicalarray = await res.json()
    return medicalarray
}

