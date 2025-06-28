"use client"
import React from 'react'

export const UserLogInContext = React.createContext({
    userInf: null,
    posts: null
});

export default function UserLogInContextBlog({ userInf, posts, children }) {
    return (
        <UserLogInContext.Provider value={{ userInf, posts }}>
            {children}
        </UserLogInContext.Provider>
    )
}
