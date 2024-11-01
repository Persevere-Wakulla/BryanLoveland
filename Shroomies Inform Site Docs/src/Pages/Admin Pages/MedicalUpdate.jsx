
export default function MedicalUpdate () {

    async function handleSubmit(e) {
        e.preventDefault()

        const data = new FormData(e.target)
        const medicalInfo = {}
        for (const info of data) {
            medicalInfo[info[0]] = info[1]
        }
        console.log(medicalInfo)
        await fetch('http://localhost:4000/medicalhome', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(medicalInfo)
        })}

    return(
        <div id="formContainer">
             <form onSubmit={handleSubmit} id="adminForm" >
                <input type="text" name="date" placeholder="Date..." />
                <input type="text" name="doctor" placeholder="Doctor's Name..."/>
                <input type="text" name="title" placeholder="Title..." />
                <textarea name="p" id="" cols="30" rows="10" placeholder="Write Article Here..."></textarea>
                <div id="formImageContainer">
                    <input type="radio" name='image' value='../Image/colorfulllake.png' />
                <label htmlFor=""><img id='imageforForm' src="../Image/colorfulllake.png" alt="" /></label>
                <input type="radio" name='image' value='../Image/door2.png' />
                <label htmlFor=""><img id='imageforForm' src="../Image/door2.png" alt="" /></label>
                <input type="radio" name='image' value='../Image/lake.png' />
                <label htmlFor=""><img id='imageforForm' src="../Image/lake.png" alt="" /></label>
                </div>
                <button className="allBtns">Submit Changes</button>
        </form>
        </div>
           
    )}