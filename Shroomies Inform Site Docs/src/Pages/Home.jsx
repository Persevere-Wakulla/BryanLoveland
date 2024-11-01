import { NavLink, Outlet } from "react-router-dom"
import { useEffect } from "react"

export default function Home() {
    // ! Change BackGround
    useEffect(() => {
        let root = document.getElementById('root')
        root.classList.add('homeBg')
        return () => root.classList.remove('homeBg')
    }, [])
    useEffect(() => {
        let tabletwallpaper = document.getElementById('root')
        tabletwallpaper.classList.add('tabletHomeWallpaper')
        return () => root.classList.remove('tabletHomeWallpaper')
    }, [])
    useEffect(() => {
        let mobilewallpaper = document.getElementById('root')
        mobilewallpaper.classList.add('mobileHomeWallpaper')
        return () => root.classList.remove('mobileHomeWallpaper')
    }, [])

    return (
        <div id="homeBackground">
            <div id="homeEntro">
                <h1 > Checkout Our Extensive Selection Of Articles And Blogs On Everything From Recreational To Medical Use Of Psychedelic's. We Have A Comperhensive Medical Section Outlining Proper Use And Benefits Of Treating Mental Health Disorders With The Use Of Psilocybin, As Well As Other Psychedelic Treatments.</h1>
                <div id="homeQuote">
                    <h1>Five Dried Grams In Slient Darkness -- Terrance McKenna</h1>
                </div>
            </div>
        </div>
    )}