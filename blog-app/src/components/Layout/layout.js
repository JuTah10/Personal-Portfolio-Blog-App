import React from 'react'
import Header from './header'

export default function CommonLayout({ children }) {
    return (
        <div className='min-h-screen bg-white'>
            <Header/>
            {children}
        </div>
    )
}

