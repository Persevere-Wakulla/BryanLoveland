import { useLoaderData } from "react-router"

export default function PsilocybinBenefits () {
   
    const psilocybinbenefits = useLoaderData()
    
    return(
        <div id='psychedelicMain'> 
       <p>{psilocybinbenefits[0].body}</p>
        </div>
       
    )}
export const psilocybinBenefitsLoader = async () => {
    const res = await fetch('http://localhost:4000/psilocybinhome')
    const psilocybinarray = await res.json()
    return psilocybinarray
}