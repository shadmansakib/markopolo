import React from 'react'
import ReactModal from 'react-modal'
import './modal.scss'

type Props = {
    children: React.ReactNode
    heading?: string
    isOpen: boolean
    onRequestClose: () => void
}
export const Modal: React.FC<Props> = ({ children, heading = undefined, isOpen, onRequestClose }) => {

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={() => onRequestClose()}
            className="modal"
            overlayClassName="overlay">
            <div className='heading-area'>
                <div className='heading'>{heading}</div>
                <div
                    className='close-btn'
                    onClick={() => onRequestClose()}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>

            <div style={{ overflowX: 'hidden', overflowY: 'auto' }}>
                {children}
            </div>

        </ReactModal>
    )
}
