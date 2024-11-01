import { useContext, useState } from "react";
import { useLoaderData } from "react-router"
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { userContext } from "../../layouts/NavLayout";

export default function AllPost() {

    const { user } = useContext(userContext)
    const newBlogPost = useLoaderData();
    const [filteredItem, setFilteredItem] = useState('');

    function filterName(e) {
        setFilteredItem(e.target.value)
    }
    function openNav() {
        document.getElementById("mySidenav").style.width = "240px";
        document.getElementById("main").style.marginLeft = "240px";
        document.getElementById('opennav').style.display = 'none';
        let Background = document.getElementById("root")
    }

    return (
        <>
            <div id="blogSearch">
                {user.username ? <NavLink to='/blogpage/blogpostpage'><h4>Post A Blog</h4></NavLink> : <h4 onClick={openNav}>Login To Post</h4>}
                <input id="blogSearchBar" onChange={filterName} type="text" placeholder="Search Blogs...." />
            </div>
            <div id="blogItems">
                {newBlogPost.filter(item => {
                    if (filteredItem === '') {
                        return item
                    }
                    return item.title.toLowerCase().includes(filteredItem)
                }).map(blogPosts => (
                    <Link id="singleBlog" to={blogPosts._id} key={blogPosts._id}>
                        {/* <div id="singleBlogHeader"> */}
                        <div id="singleImgContainer">
                            <img id="singleBlogImg" src={blogPosts.image} alt="" />
                        </div>
                        <h1>{blogPosts.title}</h1>
                        <hr />
                        <div id="singleBlogHeaderDate">
                            <div id="left">
                                {blogPosts.recommend != 0 ?
                                    <h3 >Recommended {blogPosts.recommend} Times </h3> : <h3 >none</h3>
                                }
                            </div>
                            <div id="mid">
                                 <h3 >{blogPosts.date}</h3>
                            </div>
                           <div id="right">
                             <h3>📖 {Math.round(blogPosts.sections.length * 1.3)} Min</h3>
                           </div>
                           
                        </div>
                        <hr />
                        {/* </div> */}
                        {blogPosts.sections.map(post => (
                            <>
                                <p>{post.sectionBody}</p>
                            </>
                        ))}
                    </Link>
                ))}
            </div>
        </>
    )
}