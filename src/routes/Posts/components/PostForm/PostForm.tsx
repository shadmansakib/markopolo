import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import './post-form.scss'
import { useDispatch, useSelector } from 'react-redux'
import { addPost, setPosts } from '../../../../store/actions/postAction'
import { api } from '../../../../axios'
import { Post } from '../../../../types'
import { AppState } from '../../../../store/configStore'

type Props = {
    post?: Post
    onSuccess?: () => void
    onError?: () => void
}
export const PostForm: React.FC<Props> = ({ post = undefined, onSuccess = undefined, onError = undefined }) => {
    const dispatch = useDispatch()
    const { posts } = useSelector((state: AppState) => state.posts)

    const initialValues = post || {
        title: '',
        body: '',
    }
    const validationSchema = Yup.object({
        title: Yup.string()
            .required('Required')
            .min(4, 'Must me more than 4 characters'),
        body: Yup.string()
            .required('Required')
            .min(4, 'Must me more than 4 characters'),
    })

    const onSubmit = async (values: any) => {
        // update operation
        if (post) {
            try {
                const resp = await api.put(`/posts/${post.id}`, {
                    title: values.title,
                    body: values.body,
                })

                if (resp.status !== 200) {
                    console.error('HTTP Status Error: ', resp.status)
                    if (onError) onError()
                    return
                }
                const data = resp.data

                // update state
                const postIndex = posts.findIndex((item: Post) => item.id === post.id);

                const updatedPost: Post = {
                    ...post,
                    title: values.title,
                    body: values.body,
                }

                const updatedPosts: Post[] = [
                    ...posts.slice(0, postIndex),
                    updatedPost,
                    ...posts.slice(postIndex + 1),
                ];
                dispatch(setPosts(updatedPosts))

                if (onSuccess) onSuccess()

            } catch (error) {
                console.error('Post update error: ', error)
                if (onError) onError()
            }
            return
        }

        // create operation
        try {
            const resp = await api.post('/posts', {
                title: values.title,
                body: values.body,
            })

            if (resp.status !== 201) {
                console.error('HTTP Status Error: ', resp.status)
                if (onError) onError()
                return
            }
            const data = resp.data
            dispatch(addPost(data))
            if (onSuccess) onSuccess()
        } catch (error) {
            console.error('Post Error: ', error)
            if (onError) onError()
        }


    }

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit} >
                <Form>
                    <div className='form-input'>
                        <label htmlFor='title'>
                            Title
                        </label>

                        <Field
                            type='title'
                            name='title'
                            placeholder='Post Title' />

                        <ErrorMessage name='title'>
                            {(msg: string) => (
                                <div style={{ marginTop: 5 }}>
                                    <div style={{ color: 'red' }}>
                                        {msg}
                                    </div>
                                </div>
                            )}
                        </ErrorMessage>
                    </div>


                    <div className='form-input'>
                        <label htmlFor='body'>
                            Body
                        </label>

                        <Field
                            type='body'
                            name='body'
                            as='textarea'
                            rows="15"
                            placeholder='Post Description' />

                        <ErrorMessage name='body'>
                            {(msg: string) => (
                                <div style={{ marginTop: 5 }}>
                                    <div style={{ color: 'red' }}>
                                        {msg}
                                    </div>
                                </div>
                            )}
                        </ErrorMessage>
                    </div>

                    <div style={{ backgroundColor: '', paddingTop: 5, display: 'flex', justifyContent: 'center' }}>
                        <button
                            type="submit"
                            className="btn-primary">
                            Save
                        </button>
                    </div>
                </Form>
            </Formik >
        </div>
    )
}
