import { useLoaderData } from "react-router"

export default function PsilocybinStatistics () {

    const psilocybinbenefits = useLoaderData()
   
    return(
        <div id='psychedelicMain'>
   <p>{psilocybinbenefits[2].body}</p>
    </div>
    )}
export const psilocybinStatsLoader = async () => {
    const res = await fetch('http://localhost:4000/psilocybinhome')
    const psilocybinarray = await res.json()
    return psilocybinarray
}