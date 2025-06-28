"use client"
import React from 'react'

export const UserLogInContext = React.createContext({
    userInf: null
});

export default function UserLogInContextBlog({ userInf, posts, children }) {
    return (
        <UserLogInContext.Provider value={{ userInf }}>
            {children}
        </UserLogInContext.Provider>
    )
}
