import { useLoaderData, useParams } from 'react-router'
import React, { useContext } from 'react'
import { userContext } from '../../layouts/NavLayout'

export default function MedicalArticleDetails() {

    const { user, setUser, sidebarOpen } = useContext(userContext)
    function expandArticle() {
        articlesStoryContainer.classList.toggle('enlarge')
    }
    const { id } = useParams()
    const medical = useLoaderData()
    return (
            <div className={sidebarOpen ? 'reduceContainer' : ''} id='newsDescrip' onClick={expandArticle}>
                <div className='articleHeader'>
                    <div>
                        <h3 id='articleDoctor'>{medical.doctor}</h3>
                        <h1 id='articleTitle'>{medical.title}</h1>
                    </div>
                    <h3 id='articleDate'>{medical.date}</h3>
                </div>
                <hr />
                <div id='articleMain'>
                    <img id='articleImage' src={medical.image} alt="No Image" />
                    <p>{medical.p}</p>
                </div>
            </div>
    )}
export const medicalDetailsLoader = async ({ params }) => {
    const { id } = params
    const res = await fetch('http://localhost:4000/medicalhome/' + id)
    const medicaldetailsarray = await res.json()
    return medicaldetailsarray
}  
