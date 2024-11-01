import { useLoaderData } from "react-router"

export default function MdmaStatistics () {
    
    function expandArticle() {
        medicalStoryContainer.classList.toggle('enlarge')
    }
    const mdmabenefits = useLoaderData()
    
    return(
        <div id="psychedelicMain">
   <p>{mdmabenefits[2].body}</p>
    </div>
    )
}
export const mdmaStatssLoader = async () => {
    const res = await fetch('http://localhost:4000/mdmahome')
    const mdmaarray = await res.json()
    return mdmaarray
}
