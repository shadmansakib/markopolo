import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../../store/actions/postAction'
import { AppState } from '../../store/configStore'
import { PostCard } from './components/PostCard/PostCard'
import './posts.scss'


export default function Posts() {
    const dispatch = useDispatch()
    const { posts } = useSelector((state: AppState) => state.posts);

    const [searchStr, setSearchStr] = useState('')
    const [postList, setPostList] = useState<any>(undefined)


    useEffect(() => {
        if (searchStr === '' && posts?.length > 0) setPostList(posts)
        if(posts.length > 0) return
        // @ts-ignore
        dispatch(fetchPosts())
    }, [posts, searchStr])


    useEffect(() => {
        const filteredPosts = posts.filter((post: any) => (
            post.title.toLowerCase().includes(searchStr.toLowerCase())
        ))
        setPostList(filteredPosts);
    }, [searchStr])


    return (
        <div className='posts'>
            Posts

            {/* filter area */}
            <div className='filter-area'>
                filter
                <input
                    placeholder='Search'
                    type="text"
                    value={searchStr}
                    onChange={e => setSearchStr(e.target.value)}
                />

                <span className='' style={{ backgroundColor: '', width: 250 }}>Sort by Title</span>
                <select name="sort" id="">
                    <option value="asc">Ascending</option>
                    <option value="dsc">Descending</option>
                </select>


                <button>Filter</button>
            </div>
            {/* end: filter area */}

            {postList?.map((post: any) => (
                <PostCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    body={post.body}
                />
            ))}
        </div>
    )
}
