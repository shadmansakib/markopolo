import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../axios'
import Loading from '../../components/Loading/Loading'
import { Post } from '../../types'
import { PostForm } from '../Posts/components/PostForm/PostForm'
import './edit.scss'

export default function Edit() {
    const { postID } = useParams()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [post, setPost] = useState<Post>()

    const fetchPost = async (id: string) => {
        try {
            const resp = await api.get(`/posts/${id}`)
            if (resp.status !== 200) {
                console.error('HTTP error: ', resp.status);
                return
            }
            setPost(resp.data)
        } catch (error) {
            console.error('Cannot fetch post: ', error);
        }
        setLoading(false)
    }

    useEffect(() => {
        if (!postID) return
        setLoading(true)
        fetchPost(postID)
    }, [postID])

    if (loading) return (<Loading />)

    return (
        <div className='details'>
            <h1>Edit Post</h1>
            <PostForm post={post}
                onSuccess={() => { navigate('/') }} />
        </div>
    )
}
