import { useLoaderData } from 'react-router-dom'
import { useState } from 'react'

export default function PetitionReq() {

    const petitions = useLoaderData()
    const [filteredItem, setFilteredItem] = useState('')
    function filterName(e) {
        setFilteredItem(e.target.value)
    }
    return (
        <div id='petitionReqContainer'>
        <div id='searchUsers'>
                <input onChange={filterName} type="text" placeholder='Search Users...'/>
            </div>
                <div className='userLayout'>
            {petitions.filter(item => {
                if (filteredItem === '') {
                    return item
                }
                return item.state.toLowerCase().includes(filteredItem)
            }).map(index => (
               
                <div id='userContainer'>
                    <div>
                         <p>{index.fname}</p>
                        <p>{index.lname}</p>
                        <p>{index.email}</p>
                        <p>{index.pnum}</p>
                        <p>{index.state}</p>
                        <p>{index.comment}</p>
                    </div>  
                </div>
            ))}
        </div>
        </div>
    )}
export const petitionLoader = async () => {
    const res = await fetch('http://localhost:4000/petitionform')
    const petitionRequests = await res.json()
    return petitionRequests
}
