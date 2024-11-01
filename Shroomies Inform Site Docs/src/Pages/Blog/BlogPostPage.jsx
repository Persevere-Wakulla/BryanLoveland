import { useState, Fragment, useContext } from "react"
import { useNavigate } from "react-router";
import { userContext } from '../../layouts/NavLayout';
export default function BlogPostPage() {

    const { user } = useContext(userContext)
    const [newBlogPost, setNewBlogPost] = useState({
        title: '', date: new Date(Date.now()).toLocaleString('en-US'), 
        image: '',
        sections: [{
            id: 1,
            header: '',
            sectionBody: ''
        }], author: user.username,
        recommend: 0
    })
  
    const navigate = useNavigate()

    const updateSections = (e, sectionId, property) =>
        setNewBlogPost({
            ...newBlogPost, sections: [
                ...newBlogPost.sections.filter(x => x.id !== sectionId),
                {
                    ...newBlogPost.sections.find(x => x.id === sectionId),
                    [property]: e.target.value
                }
            ]
        })

        

    async function submitPost(e) {
        e.preventDefault()
        await fetch('http://localhost:4000/blogpostpage', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBlogPost)
        })
        navigate('/blogpage')
    }

    return (
        <div  id="blogGeneratorContainer">
            <div id="preview">
                <div id="previewHeaderContainer">
                     <div id="previewDate">
                        <h4>{newBlogPost.date}</h4>
                <h4>by: {newBlogPost.author}</h4></div>
                
                <h1 id="blogHeaderTitle">{newBlogPost.title}</h1>
                </div>
               
                <hr />
                <div id="previewImgContainer" ><div id='previewImgBlog'><img id='blogStoryImg' src={newBlogPost.image} alt="" /></div></div>
                
                {newBlogPost.sections.map(x => (
                    <>
                        <h1 id="blogHeaderTitle">{x.header}</h1>
                        <p id="previewBody">{x.sectionBody}</p>
                    </>
                ))}
            </div>
            <form id="generateBlogForm" action="" >
                <input onChange={(e) => setNewBlogPost({ ...newBlogPost, title: e.target.value })} id="blogTitle" placeholder="Title..." type="text" required /> <br />
                <div onChange={(e) => setNewBlogPost({ ...newBlogPost, image: e.target.value })}  id="formImageContainer">
                <input type="radio" name='image' value='../Image/colorfulllake.png' />
                <img id='imageforForm' src="../Image/colorfulllake.png" alt="" />
                <input type="radio" name='image' value='../Image/door2.png' />
                <img id='imageforForm' src="../Image/door2.png" alt="" />
                <input type="radio" name='image' value='../Image/lake.png' />
                <img id='imageforForm' src="../Image/lake.png" alt="" />
            </div>
                {newBlogPost.sections.map((x, index) => {
                    return (
                        <Fragment key={x.id}>
                            {index !== 0 && <input id="sectionHeaderInput" type="text" onChange={(e) => updateSections(e, x.id, 'header')} placeholder="Section Header" />}
                            <textarea value={x.sectionBody} onChange={(e) => updateSections(e, x.id, 'sectionBody')} name="" id="blogBody" placeholder="Body..." required></textarea>
                        </Fragment>
                    )
                })}
                <button onClick={() =>
                    setNewBlogPost({
                        ...newBlogPost, sections: [...newBlogPost.sections,
                        {
                            id: (Math.max(...newBlogPost.sections.map(x => x.id))) + 1,
                            header: '',
                            sectionBody: ''
                        }
                        ]
                    })} className="text-3xl">➕</button>
                <div>
                    <button onClick={submitPost} className="allBtns">Submit</button>
                    <button className="allBtns" onClick={() => {
                       let cancel = confirm("Are You Sure You Want To Cancel")
                       if(cancel === true) {
                        navigate('/blogpage')
                       }
                    }}>Cancel</button>
                </div>
            </form>
        </div>
    )}