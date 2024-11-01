import { Outlet, NavLink } from 'react-router-dom';
import { userContext } from './NavLayout';
import { useContext } from 'react';



export default function BlogLayout() {

    const { sidebarOpen } = useContext(userContext)

    return (
        <div className={sidebarOpen ? 'reduceContainer' : ''}  id='blogLayout'>
            <Outlet/>
        </div>
    )
}
export const BlogLoader = async () => {
    const res = await fetch('http://localhost:4000/bloghome')
    const recentBlogPostArray = await res.json()
    return recentBlogPostArray
}
