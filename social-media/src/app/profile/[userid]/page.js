"use client"
import React from 'react'
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { useForm } from 'react-hook-form';

import { User } from "lucide-react"

import { useParams } from 'next/navigation';

import { UserLogInContext } from '@/components/UserLogInContextBlog';

export default function UserNameProfilePage() {
    const { userInf } = React.useContext(UserLogInContext);
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: userInf.name,
            email: userInf.email,
            location: userInf.location,
            website: userInf.website
        }
    });
    const params = useParams();

    // console.log(params.userid);


    const [displayProfilePage, setDisplayProfilePage] = React.useState(true);

    function onSubmit(data) {
        console.log(data);
    }

    return (
        <div className='grid grid-cols-1 lg:grid-cols-9 lg:grid-rows-1 gap-5'>
            <div className='col-span-2 lg:flex flex-col gap-2'>
                <Button
                    variant={`${displayProfilePage ? "default" : "ghost"}`}
                    className="rounded-3xl cursor-pointer"
                    onClick={() => setDisplayProfilePage(true)}
                    disabled={displayProfilePage}
                >
                    Profile
                </Button>
                <Button
                    variant={`${!displayProfilePage ? "default" : "ghost"}`}
                    className="rounded-3xl cursor-pointer"
                    onClick={() => setDisplayProfilePage(false)}
                    disabled={!displayProfilePage}
                >
                    Activity
                </Button>
            </div>
            <Card className="col-span-7">
                {displayProfilePage ?
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardHeader>
                            <CardTitle className="flex justify-start items-center gap-2">
                                <User />
                                <h1>Profile</h1>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-3 w-[100%] gap-4">
                                <div className="grid w-full items-center gap-3">
                                    <Label htmlFor="email">Email</Label>
                                    <Input disabled type="email" id="email" placeholder={userInf.email} />
                                </div>
                                <div className="grid w-full items-center gap-3">
                                    <Label htmlFor="name">
                                        Name
                                        {errors.name && <span className="text-sm text-red-500">Name is required</span>}
                                    </Label>
                                    <Input
                                        type="text"
                                        id="name"
                                        placeholder="Name"
                                        {...register("name", { required: true })}
                                    />

                                </div>
                                <div className="grid w-full items-center gap-3">
                                    <Label htmlFor="location">
                                        Location
                                    </Label>
                                    <Input
                                        type="text"
                                        id="location"
                                        placeholder="Location"
                                        {...register("location")}
                                    />
                                </div>
                                <div className="grid w-full items-center gap-3">
                                    <Label htmlFor="website">
                                        Website
                                    </Label>
                                    <Input type="text" id="website" placeholder="Website" />
                                </div>
                                <div className='md:col-span-3 row-span-full w-full flex justify-center items-center'>
                                    <Avatar className=" size-24 sm:w-24 sm:h-24">
                                        <AvatarImage src={userInf.image ?? "https://www.gravatar.com/avatar/?d=mp"} />
                                    </Avatar>
                                </div>
                            </div>
                            <Button className="my-4 cursor-pointer">
                                Save
                            </Button>
                        </CardContent>
                    </form>
                    :
                    <></>
                }
            </Card>
        </div>

    )
}
