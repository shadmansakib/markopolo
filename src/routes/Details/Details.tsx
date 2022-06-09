import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { api } from '../../axios';
import Loading from '../../components/Loading/Loading';
import { Post } from '../../types';
import './details.scss'

export default function Details() {
    const { postID } = useParams()

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
        console.log({ postID });
        if (!postID) return
        setLoading(true)
        fetchPost(postID)

    }, [postID])

    if (loading) return (<Loading />)


    return (
        <div className='details'>
            <h1 className='heading'>{post?.title}</h1>
            <p className='author'>Posted by user ID {post?.userId}</p>

            <div className='body'>
                <p>{post?.body}</p>
            </div>
        </div>
    )
}
