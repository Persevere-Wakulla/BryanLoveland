import { useLoaderData } from "react-router"

export default function MdmaBenefits () {
  

    const mdmabenefits = useLoaderData()
    return(
        <div id="psychedelicMain">
        <p>{mdmabenefits[0].body}</p>  
    </div>
    )
}
export const mdmaBenefitsLoader = async () => {
    const res = await fetch('http://localhost:4000/mdmahome')
    const mdmaarray = await res.json()
    return mdmaarray
}
