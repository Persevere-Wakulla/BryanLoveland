import { Outlet } from 'react-router-dom'
import { useLoaderData, Link } from 'react-router-dom'
import { useState } from 'react';



export default function ArticlesLayout() {

    const articles = useLoaderData()
    const [filteredItem, setFilteredItem] = useState('')
    function filterName(e) {
        setFilteredItem(e.target.value)
    }

    return (
        <div id='newsGrid'>
            <div className="dropdown">
                <button className="dropbtn">Additional Reading</button>
                <div className="dropdown-content">
                    <div id='searchContainer'>
                        <label id='titleSearch' htmlFor="">Search News</label>
                        <input onChange={filterName} type="text" />
                    </div>
                    {articles.filter(item => {
                        if (filteredItem === '') {
                            return item
                        }
                        return item.title.toLowerCase().includes(filteredItem)
                    }).map(index => (

                        <Link to={index._id} key={index.title}>
                            <div >
                                <h4>{index.title}</h4>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <Outlet />
            <div id='newsDescripList'>
                <div id='searchContainer'>
                    <input onChange={filterName} type="text" placeholder='Title Search...' />
                </div>
                <div id='articleTitles'>
                    {articles.filter(item => {
                        if (filteredItem === '') {
                            return item
                        }
                        return item.title.toLowerCase().includes(filteredItem)
                    }).map(index => (
                            <Link to={index._id} key={index.title}>
                                <h4>{index.title}</h4>
                            </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
export const articlesLoader = async () => {
    const res = await fetch('http://localhost:4000/newshome')
    const articlesarray = await res.json()
    return articlesarray
}

