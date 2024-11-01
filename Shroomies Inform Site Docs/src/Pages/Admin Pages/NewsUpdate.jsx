
export default function NewsUpdate() {

    async function handleSubmit(e) {
        e.preventDefault()

        const data = new FormData(e.target)
        const newsInfo = {}
        for (const info of data) {
            newsInfo[info[0]] = info[1]
        }
        console.log(newsInfo)
        await fetch('http://localhost:4000/newshome', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newsInfo)
        })
    }

    return (
        <div id="formContainer">
               <form onSubmit={handleSubmit} id="adminForm">
            <input type="text" name="Date" placeholder="Date..." />
            <input type="text" name="title" placeholder="Title..." />
            <textarea name="p" id="" cols="30" rows="10" placeholder="Write Article Here..."></textarea>
            <div id="formImageContainer">
                <input type="radio" name='image' value='../Image/colorfulllake.png' />
                <img id='imageforForm' src="../Image/colorfulllake.png" alt="" />
                <input type="radio" name='image' value='../Image/door2.png' />
                <img id='imageforForm' src="../Image/door2.png" alt="" />
                <input type="radio" name='image' value='../Image/lake.png' />
                <img id='imageforForm' src="../Image/lake.png" alt="" />
            </div>
            <button className="allBtns">Submit Changes</button>
        </form>
        </div>
     
    )
}