import React from 'react';
import { Outlet, Navigate } from "react-router-dom";
import './private-outlet.scss'

interface IProps {
    userID: string
}

const PrivateOutlet: React.FC<IProps> = ({ userID = undefined }) => {

    if (!userID) return <Navigate to="/login" />

    return (
        <div className="private-outlet">
            <div className="outlet-container">
                <Outlet />
            </div>
        </div>
    )
}

export default PrivateOutlet