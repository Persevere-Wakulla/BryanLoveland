import { useLoaderData } from "react-router"

export default function MdmaStatus () {

    function expandArticle() {
        medicalStoryContainer.classList.toggle('enlarge')
    }
    const mdmabenefits = useLoaderData()

    return(
        <div id="psychedelicMain">
   <p>{mdmabenefits[1].body}</p>
    </div>
    )}
export const mdmaStatusLoader = async () => {
    const res = await fetch('http://localhost:4000/mdmahome')
    const mdmaarray = await res.json()
    return mdmaarray
}