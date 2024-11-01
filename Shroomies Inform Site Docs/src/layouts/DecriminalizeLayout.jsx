import { useContext } from "react"
import { userContext } from "./NavLayout"

export default function DecriminalizeLayout() {

  const { sidebarOpen } = useContext(userContext)
    async function handleSubmit(e) {
        e.preventDefault()
  
        const data = new FormData(e.target)
        const petitionInfo = {}
        for (const info of data) {
            petitionInfo[info[0]] = info[1]
        }
        console.log(petitionInfo)
      await fetch('http://localhost:4000/petitionform', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(petitionInfo)
      })}
    
    return (
      <div  id="psychedelicMain">
        <h1>Decriminalization Explained</h1>
        <div className={sidebarOpen ? 'reduceContainer' : ''} id="psychedelicGrid">
          <div id='decrimDescrip'> <p>When A State Decriminalizes Psychedelics It Allows For A Law To Be Voted On That Gives Said State The Right To Not Only Not Charge A Person With A Criminal Offense For The Possesion Of Psilocybin, But Also Gives The State The Option To Vote And Allow Licenses To Open Treatment Clinics That Use Psilocybin To Treat Mental Health Issues. Shroomies Is Working With Groups All Over The Country To Help Submit Petitions To Get Decriminalization On The Ballet To Be Voted On.  If You Would Like To Get Involved, Please Fill Out And Submit The Form On The Second Tab.  Thanks For Your Support.</p></div>
        
        <form id="Form" onSubmit={handleSubmit}>
          <input type="text" id="fname" name="fname" placeholder="First Name.." />
          <input type="text" id="lname" name="lname" placeholder="Last Name.." />
          <input type="text" id="phone" name="pnum" placeholder="Phone Number.." />
          <input type="text" id="email" name="email" placeholder="Email Address.." />
          <input type="text" id="email" name="state" placeholder="Home State.." />
          <textarea id="subject" name="comment" placeholder="Additional Comment.." ></textarea>
          <button className="allBtns">Submit</button>
        </form>
        </div>
       </div>
    )
}