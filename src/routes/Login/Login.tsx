import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../../store/actions/authAction';
import './login.scss';
import { AppState } from '../../store/configStore';
import { Navigate } from 'react-router-dom';

export default function Login() {
    const dispatch = useDispatch()
    const { user } = useSelector((state: AppState) => state.auth)

    const initialValues = {
        email: '',
        password: '',
    }
    const validationSchema = Yup.object({
        email: Yup.string()
            .required('Required')
            // .email('Invalid Email Address')
            .min(4, 'Must me more than 4 characters'),
        password: Yup.string()
            .required('Required')
            .min(4, 'Must me more than 4 characters'),
    })

    const onSubmit = async (values: any) => {
        dispatch(setAuthUser(values.email))
    }

    if (user) return <Navigate to="/" />

    return (
        <div className="login-container">
            <div className="login-card" >
                <h1>Log in</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}>
                    <Form>
                        <div className='form-input'>
                            <label htmlFor='email'>
                                Email
                            </label>

                            <Field
                                type='email'
                                name='email'
                                placeholder='Email Address' />

                            <ErrorMessage name='email'>
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
                            <label htmlFor='password'>
                                Password
                            </label>

                            <Field
                                type='password'
                                name='password'
                                placeholder='Password' />

                            <ErrorMessage name='password'>
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
                                Log in
                            </button>
                        </div>
                    </Form>
                </Formik >
            </div >
        </div >
    )
}
