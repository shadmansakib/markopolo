import React from 'react'
import './loading.scss'

export default function Loading() {
    return (
        <div className="loading">
            <div className="loader"></div>
            <span>Loading...</span>
        </div>
    )
}
