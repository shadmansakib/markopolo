import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '../../components/Modal/Modal'
import { fetchPosts } from '../../store/actions/postAction'
import { AppState } from '../../store/configStore'
import { PostCard } from './components/PostCard/PostCard'
import { PostForm } from './components/PostForm/PostForm'
import './posts.scss'


export default function Posts() {
    const dispatch = useDispatch()
    const { posts } = useSelector((state: AppState) => state.posts);

    const [selectedMenu, setSelectedMenu] = useState<string | number | undefined>()
    const [searchStr, setSearchStr] = useState('')
    const [postList, setPostList] = useState<any>(undefined)


    useEffect(() => {
        if (searchStr === '' && posts?.length > 0) setPostList(posts)
        if (posts.length > 0) return
        // @ts-ignore
        dispatch(fetchPosts())
    }, [posts, searchStr])


    useEffect(() => {
        // if (searchStr === '') {
        //     setPostList(posts)
        //     return
        // }
        const filteredPosts = posts.filter((post: any) => (
            post.title.toLowerCase().includes(searchStr.toLowerCase())
        ))
        setPostList(filteredPosts);
    }, [searchStr])



    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }


    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div className='posts'>
            {/* create post FAB */}
            {!modalIsOpen && (
                <div className="fab" onClick={() => openModal()}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </div>
            )}

            <Modal
                heading='Create Post'
                isOpen={modalIsOpen}
                onRequestClose={closeModal}>
                <PostForm
                    onSuccess={() => closeModal()}
                />
            </Modal>


            <h1 className='page-heading'>All Posts</h1>

            <div className='filter-grid-container'>
                <div className='grid-item'>
                    {/* <p>Search Posts</p> */}
                    <input
                        placeholder='Search/Filter Posts'
                        type="text"
                        value={searchStr}
                        onChange={e => setSearchStr(e.target.value)}
                    />
                </div>

                <div className='grid-item'>
                    <p>Sort by Title</p>

                    <select name="sort" id="">
                        <option value="asc">Ascending</option>
                        <option value="dsc">Descending</option>
                    </select>
                </div>
            </div>

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
