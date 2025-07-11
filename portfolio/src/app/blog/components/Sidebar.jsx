"use client"
import React from "react"
import { UserLogInContext } from "../../../components/UserLogInContextBlog";
import { UnauthenticatedSidebar } from './UnauthenticatedSidebar';
import UserCard from './UserCard';



export default function Sidebar() {

    const { userInf } = React.useContext(UserLogInContext)

    if (!userInf) return <UnauthenticatedSidebar />


    return (
        <UserCard userInf={userInf} />
    );

}

