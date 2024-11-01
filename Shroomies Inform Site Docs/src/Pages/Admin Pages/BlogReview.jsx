import { useLoaderData, useParams } from 'react-router'
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function BlogReview() {
    const navigate = useNavigate()
    const [filteredItem, setFilteredItem] = useState('');
    const [filterPicked, setFilterPicked] = useState('')

    function filterChoice(e) {
        setFilterPicked(e.target.value)
    }
    function filterName(e) {
        setFilteredItem(e.target.value)
    } 
    const Blog = useLoaderData()
    async function deleteBlogPost(id) {
        let res = await fetch(`http://localhost:4000/blogpage/${id}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            body: null
        })
        let recal = await res.json()
        navigate('/admin/blogreview')
    }

    async function deleteComment(id, comment) {
        console.log(comment)
        let res = await fetch(`http://localhost:4000/blogpage/${id}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
    
            body: JSON.stringify({comment} )
        })
        navigate('/admin/blogreview')
    }

    return (
        <div id='blogReviewLayout'>
            <div id="blogSearchContainer">
               <select onChange={filterChoice} name="" id="">
                <option value="">Search</option>
                <option value="author">Author</option>
                <option value="date">Date</option>
                <option value="title">Title</option>
               </select>
               <input onChange={filterName} type="text" />
            </div>
            {Blog.filter(item => {
                if (filteredItem === '') {
                    return item
                }
                return item[filterPicked].toLowerCase().includes(filteredItem)
            }).map(Blog => (
                <div id='adminBlogReview'>
                    <div><button id='deleteBlogBtn' onClick={() => deleteBlogPost(Blog._id)}>Delete Post</button>
                    <p>By: {Blog.author}</p>
                    <p>{Blog.date}</p>
                    <p>{Blog.title}</p></div>
                    
                    <hr />
                    {Blog.sections.map(section => (
                        <>
                        <p>{section.sectionBody}</p>
                        <p>{section.header}</p>
                        </>
                    ))}
                    {Blog.comment.map(comments => (
                        <div id='commentsContainer' key='comments'>
                            <button id='deleteBlogBtn' onClick={() => deleteComment(Blog._id, comments.commentId)}>Delete Comment</button>
                            <p>By: {comments.author}</p>
                            <p>{comments.body}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export const ReviewBlogs = async () => {
    const res = await fetch('http://localhost:4000/bloghome')
    const recentBlogPostArray = await res.json()
    return recentBlogPostArray
}
