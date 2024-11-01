import { useState } from "react";

export default function MdmaAdmin () {

    const [adminChoice, setAdminChoice] = useState('')

    function formType (e) {
        setAdminChoice(e.target.value) 
    }

    async function handleSubmit(e) {
        e.preventDefault()
        console.log(adminChoice)
        const data = new FormData(e.target)
        const mdmaInfo = {}
        for (const info of data) {
            mdmaInfo[info[0]] = info[1]
        }
        console.log(mdmaInfo)
        await fetch('http://localhost:4000/mdmahome', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(mdmaInfo)
        })
        
    }

    return (
        <div id="formContainer">
              <form onSubmit={handleSubmit} id="adminForm">
            <select onChange={formType}  name="" id="">
                <option value="">Choose A Page</option>
                <option value="benefits">Benefits</option>
                <option value="status">Status</option>
                <option value="statistics">Statistics</option>
            </select>
                <textarea name={adminChoice} id="" cols="30" rows="10" placeholder="Write Article Here..."></textarea>
                <button className="allBtns">Submit Changes</button>
       </form>
        </div>
          
    )}