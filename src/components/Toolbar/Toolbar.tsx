import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { unsetAuthUser } from '../../store/actions/authAction';
import { AppState } from '../../store/configStore';
import './toolbar.scss';

export default function Toolbar() {
    const { user } = useSelector((state: AppState) => state.auth)
    const dispatch = useDispatch()

    return (
        <nav className="toolbar">

            <div className="content">
                <div className="logo">
                    <Link to="/">
                        <h2>Markopolo<sup>assignment</sup></h2>
                    </Link>
                </div>

                <div className="flex1" />

                <div className="menu">
                    <ul>
                        {!user && <li><NavLink to="/login">Login</NavLink></li>}
                        {user && (
                            <>
                                <li><NavLink to="/">Posts</NavLink></li>
                                <li><NavLink to="#" onClick={e => { dispatch(unsetAuthUser()) }}>Logout</NavLink></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
