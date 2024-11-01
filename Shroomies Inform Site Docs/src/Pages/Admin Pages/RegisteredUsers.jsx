import { useLoaderData } from 'react-router-dom'
import { useState } from 'react'


export default function RegisteredUsers() {

    const registeredUsers = useLoaderData()
    let allUsers = registeredUsers.length;
    const [filteredItem, setFilteredItem] = useState('')
    function filterName(e) {
        setFilteredItem(e.target.value)
    }
    return(
        <div id='registeredUsersLayout'>
        <div id='searchUsers'>
                <input onChange={filterName} type="text" placeholder='Search Users...'/>
                <h4>Current Users: {allUsers}</h4>
            </div>
                <div className='userLayout'>
            {registeredUsers.filter(item => {
                if (filteredItem === '') {
                    return item
                }
                return item.username.toLowerCase().includes(filteredItem)
            }).map(index => (
                <div id='userContainer'>
                    <div>
                        <p>{index.username}</p>
                         <p>{index.fname}</p>
                        <p>{index.lname}</p>
                        <p>{index.email}</p>
                        <p>{index.password}</p>
                        <p>A: {JSON.stringify(index.admin)}</p>
                        <p>O: {JSON.stringify(index.owner)}</p>
                    </div>  
                </div>
            ))}
        </div>
        </div>
    )}
export const registeredUsersLoader = async () => {
    const res = await fetch('http://localhost:4000/users')
    const registeredUsers = await res.json()
    return registeredUsers
}