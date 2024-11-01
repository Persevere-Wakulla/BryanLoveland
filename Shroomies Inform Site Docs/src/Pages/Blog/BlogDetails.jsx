import React, { useContext } from 'react';
import { useLoaderData, useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { userContext } from '../../layouts/NavLayout';

export default function BlogDetails() {

    const { user, setUser, sidebarOpen } = useContext(userContext)
    let loggedInUser = user.username
    const { id } = useParams()
    const blogs = useLoaderData()
    let blogLength = blogs.sections.length;
    const navigate = useNavigate()

    const [allComments, setAllComments] = useState(blogs.comment)
    const [newBlogComment, setNewBlogComment] = useState({})
    const [authorofComment, setauthorofComment] = useState('')
    const [additionalLikes, setAdditionalLikes] = useState(blogs.recommend)

    function closeBlog() {
        navigate('/blogpage')
    }

    // ! Comments
    function newComment(e) {
        setauthorofComment(loggedInUser)
        let newCommentDate = new Date()
        let nBD = newCommentDate.toLocaleString('en-US')
        let newCommentBody = e.target.value
        setNewBlogComment({ date: nBD, author: authorofComment, body: newCommentBody })
    }

    async function submitComment(e) {
        e.preventDefault();
        document.getElementById('newCommentBody').value = ''
        let res = await fetch(`http://localhost:4000/blogpage/newcomment/${id}`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBlogComment)
        })
        let recal = await res.json()
        setAllComments(recal.comment)
    }

    async function recommendBlog() {
        if (user) {
            let click = { recommend: additionalLikes + 1 }
            let res = await fetch(`http://localhost:4000/blogpage/${id}`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(click)
            })
            let data = await res.json()
            navigate(`/blogpage/${id}`)

            // ! Add like To User Profile
            let addrecommend = { loggedInUser, id }
            let response = await fetch('http://localhost:4000/users', {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(addrecommend)
            })
            let newres = await response.json()
            setUser(newres)
        }
    }
    //    ! End Comments
    function openNav() {
        document.getElementById("mySidenav").style.width = "240px";
        document.getElementById("main").style.marginLeft = "240px";
        document.getElementById('opennav').style.display = 'none';
        let Background = document.getElementById("root")
        Background.classList.add('darken');
    }

    return (
        <div id="singleItemContainer">
            <div id='blogHeaderContainer'>
                {/* <div id='blogHeader'> */}
                    <div>
                        <h3 id='blogHeaderDate'>{blogs.date}</h3>
                        <h3 id='blogHeaderAuthor'>By: {blogs.author}</h3>
                    </div>
                    <h1 id='blogHeaderTitle'> {blogs.title}</h1>
                {/* </div> */}
                <div id='closeBlogContainer'>
                    <button onClick={closeBlog} className="allBtns">Close</button>
                    {user && !user.recommended.includes(id) && <h4 onClick={recommendBlog} id='recommendBtn'>Recommend</h4> }
                    <div id='recommendBlog'> {blogs.recommend != 0 ?
                        <h3>Recommended By <span id='recommendedNumber'>{blogs.recommend}</span> Persons</h3> : null
                    }</div>
                </div>
            </div>
            <div id='mobileBlogHeader'>
                <div id='mBlogDate-Close'>
                    <div id='blogHeader'>
                        <div>
                            <h3 id='blogHeaderDate'>{blogs.date}</h3>
                            <h3 id='blogHeaderAuthor'>By: {blogs.author}</h3>
                        </div>

                    </div>
                    <div id='closeBlogContainer'>
                        {user && !user.recommended.includes(id) && <h4 onClick={recommendBlog} id='recommendBtn'>Recommend</h4>}
                        <div id='recommendBlog'> {blogs.recommend != 0 ?
                            <h3>Recommended By <span id='recommendedNumber'>{blogs.recommend}</span> Persons</h3> : null
                        }</div>
                    </div>
                    <h4 onClick={closeBlog} className="allBtns">Close</h4>
                </div>

                <h4 id='estReadTime'>📖 Est. Read Time: {Math.round(blogLength * 2)} Mins</h4>
                <h1 id='blogHeaderTitle'> {blogs.title}</h1>
            </div>

            <hr />
            <div id='blogStoryLayout'>
                <div id='blogStoryContainer'>
                    <div id='imgBlogContainer'><img id='blogStoryImg' src={blogs.image} alt="" /></div>
                    {blogs.sections.map(post => (
                        <>

                            <h1 id={post.header} className='additionalBlogHeaderTitle'>{post.header}</h1>
                            <p id='blogStory'>{post.sectionBody}</p>
                        </>
                    ))}
                    <div id='newCommentPost'>
                        {allComments.length > 0 ? allComments.map((com, index) => {
                            return <div id='newCommentContainer' key={index}>
                                <span id='commentHeaderItems'></span><span id='commentHeaderDetails'> {com.date}</span>
                                <br />
                                <span id='commentHeaderItems'> </span><span id='commentHeaderDetails'>By: {com.author}</span>
                                <br />
                                <hr />
                                <span id='commentHeaderItems'></span>
                                <br />
                                <span id='commentBody'>{com.body}</span>
                            </div>
                        }) : <h3 id='noComments'>Currently No Comments</h3>
                        }
                    </div>
                    <form id='blogCommentForm'>
                        <textarea onChange={newComment} name="commentInput" id="newCommentBody"  ></textarea>
                        {user ? <button onClick={submitComment} className="allBtns" type='submit'>Submit Comment</button> : <div id='loginToComment'><h4  onClick={openNav}>Login To Comment</h4></div>}
                    </form>
                        <button onClick={closeBlog} className="allBtns">Close</button>
                </div>
                <div className="dropdown">
                <button className="dropbtn">In This Blog</button>
                <div className="dropdown-content">
                {blogs.sections.map(post => (
                        <>
                            <a href={`#${post.header}`}><h2 id='headerRefTabs'>{post.header}</h2></a>
                        </>
                    ))}
            </div>
            </div>
                <div id='blogStorySideTabs'>
                    <h2>IN THIS BLOG</h2>
                    <hr />
                    {blogs.sections.map(post => (
                        <>
                            <a href={`#${post.header}`}><h2 id='headerRefTabs'>{post.header}</h2></a>
                        </>
                    ))}
                    <hr />
                    <h2>📖 Est. Read Time: {Math.round(blogLength * 1.3)} Mins</h2>
                </div>
            </div>
        </div>
    )
}
export const BlogsDetailsLoader = async ({ params }) => {
    const { id } = params
    const res = await fetch('http://localhost:4000/bloghome/' + id)
    const blogDetailsArray = await res.json()
    return blogDetailsArray
}



