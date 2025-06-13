import React from "react"
import { Button } from "@/components/ui/button"
import { GuestWarning } from "./GuestWarning"
import { SignInButton, SignUpButton } from '@clerk/nextjs'

import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"



export function UnauthenticatedSidebar() {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader >
                <div className="flex flex-col space-y-5 text-center">
                    <CardTitle className="text-xl font-bold">Welcome back!</CardTitle>
                    <CardDescription >
                        Login to access your profile and connect with others
                    </CardDescription>
                </div>
            </CardHeader>

            <CardFooter className="flex-col gap-2">
                <SignInButton mode="modal">
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                    <Button variant="outline" className="w-full">
                        Sign up
                    </Button>
                </SignUpButton>
                <GuestWarning />
            </CardFooter>
        </Card>
    )
}

