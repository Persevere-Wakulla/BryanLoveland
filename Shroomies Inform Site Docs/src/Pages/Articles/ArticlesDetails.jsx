import { useLoaderData, useParams } from 'react-router'
import React, { useContext } from 'react'
import { userContext } from '../../layouts/NavLayout'


export default function ArticlesDetails() {

    const { user, setUser, sidebarOpen} = useContext(userContext)
    const { id } = useParams()
    const articles = useLoaderData()

    return (
            <div className={sidebarOpen ? 'reduceContainer' : ''} id='newsDescrip'>
                <div className='articleHeader'>
                    <h1 id='articleTitle'>{articles.title}</h1>
                    <h3 className='reducedFonts' id='articleDate'>{articles.Date}</h3>
                </div>
                <hr />
                <div id='articleMain'>
                    <img id='articleImage' src="../Image/colorfulllake.png" alt="" />
                    <p>{articles.p}</p>
                </div>
            </div>
    )}
export const articlesDetailsLoader = async ({ params }) => {
    const { id } = params
    const res = await fetch('http://localhost:4000/newshome/' + id)
    const articledetailsarray = await res.json()
    return articledetailsarray
}

