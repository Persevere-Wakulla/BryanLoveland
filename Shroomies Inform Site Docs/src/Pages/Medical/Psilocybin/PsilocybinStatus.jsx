import { useLoaderData } from "react-router"

export default function PsilocybinStatus() {

    const psilocybinbenefits = useLoaderData()
   
    return(
        <div id='psychedelicMain'>
   <p>{psilocybinbenefits[1].body}</p>
 
    </div>
    )}
export const psilocybinStatusLoader = async () => {
    const res = await fetch('http://localhost:4000/psilocybinhome')
    const psilocybinarray = await res.json()
    return psilocybinarray
}