import { NavLink, Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { userContext } from './NavLayout'
import { useContext } from 'react'

export default function HelpLayout() {

    const { sidebarOpen } = useContext(userContext)
    // ! Change BackGround
    useEffect(() => {
        let root = document.getElementById('root')
        root.classList.add('allPages')
        return () => root.classList.remove('allPages')
    }, [])

    return (
        <div   id='psychedelicMain'>
            <h1>Contact Us</h1>
            <div className={sidebarOpen ? 'reduceContainer' : ''} id='psychedelicGrid'>
            <div id='decrimDescrip'>
                <p>Shroomies Brand Was Originally Founded To Make Creative Designs On Clothing And Canvas For The Psychedelic Community.  After Realizing All The Medical Benefits Psychedelics Bring To The Treatment of Mental Health, We Decided We Had To Get Involved In The Process Of Spreading The Word, And Helping People By Supplying Factual Information As Well As Guiding People Through The Process Of Learning Safe Methods To Enjoying Psychedelics. Please Reach Out With Any Questions, And Don't Forget To Keep On Trippin. </p>
            </div>
            <div id='decrimDescrip'>
                <p>Main Office Information</p>
                <p>Office Number: (866)-555-1212</p>
                <p>Mobile Number: (215)-555-1212</p>
                <p>1000 Broad St.</p>
                 <p>Philadelphia, PA 18765</p>   
                <p id="email">Email: ShroomiesInform@
                    shroomiesBrand.Co</p>
            </div>
            </div>
        </div>
    )}