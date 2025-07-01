"use client"
import React from 'react'
import { Button } from '@/components/ui/button';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { useParams } from 'next/navigation';


export default function UserNameProfilePage() {
    const params = useParams();

    console.log(params.username);

    const [displayProfilePage, setDisplayProfilePage] = React.useState(true);

    return (
        <div className='grid grid-cols-1 grid-rows-2 lg:grid-cols-9 lg:grid-rows-1 gap-5'>
            <div className='col-span-2 lg:flex flex-col gap-2'>
                <Button
                    variant={`${displayProfilePage ? "secondary" : "ghost"}`}
                    className="rounded-3xl cursor-pointer"
                    onClick={() => setDisplayProfilePage(true)}
                    disabled={displayProfilePage}
                >
                    Profile
                </Button>
                <Button
                    variant={`${!displayProfilePage ? "secondary" : "ghost"}`}
                    className="rounded-3xl cursor-pointer"
                    onClick={() => setDisplayProfilePage(false)}
                    disabled={!displayProfilePage}
                >
                    Activity
                </Button>
            </div>
            <Card className="col-span-7">

            </Card>
        </div>

    )
}
