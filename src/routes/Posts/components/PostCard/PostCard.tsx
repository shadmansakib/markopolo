import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { api } from '../../../../axios'
import { setPosts } from '../../../../store/actions/postAction'
import { AppState } from '../../../../store/configStore'
import { Post } from '../../../../types'
import './post-card.scss'

type Props = {
    id: number
    title: string
    body: string
}
export const PostCard: React.FC<Props> = ({ id, title, body }) => {
    const [isDeleting, setIsDeleting] = useState(false)
    const dispatch = useDispatch()
    const { posts } = useSelector((state: AppState) => state.posts)

    const onDelete = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setIsDeleting(true)

        try {
            const resp = await api.delete(`/posts/${id}`)
            if (resp.status !== 200) {
                console.error(`HTTP Error: `, resp.status)
                return
            }
            const filteredPosts = posts.filter((post: Post) => (post.id !== id))
            dispatch(setPosts(filteredPosts))
        } catch (error) {
            setIsDeleting(false)
            console.error(`Error while deleting post: `, error);
        }
    }

    return (
        <div className="card-container">
            <div className="card">
                <div className="card-content-area">

                    <div className='card-content'>
                        <div>
                            <p className="heading">{title}</p>
                            <p className="card-text">{body}</p>
                        </div>

                        <div className="card-button-area">
                            <button
                                className='edit-button'
                                onClick={e => { }}>
                                Edit
                            </button>

                            <button
                                className='delete-button'
                                disabled={isDeleting}
                                onClick={onDelete}>
                                {isDeleting ? 'Deleteting' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
