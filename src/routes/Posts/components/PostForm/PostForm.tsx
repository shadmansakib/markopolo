import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import './post-form.scss'
import { useDispatch } from 'react-redux'
import { addPost } from '../../../../store/actions/postAction'
import { api } from '../../../../axios'

type Props = {
    onSuccess?: () => void
    onError?: () => void
}
export const PostForm: React.FC<Props> = ({ onSuccess = undefined, onError = undefined }) => {
    const dispatch = useDispatch()

    const initialValues = {
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
        console.log({
            title: values.title,
            body: values.body,
        });

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
            // todo: hide modal, add new post (resp.data) to list
            const data = resp.data
            dispatch(addPost(data))
            // console.log({data});
            
            if (onSuccess) onSuccess()
        } catch (error) {
            console.error('Post Error: ', error)

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
