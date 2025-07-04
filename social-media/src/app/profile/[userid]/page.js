"use client"
import React from 'react'
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { useForm } from 'react-hook-form';

import { User, LoaderCircle, Activity } from "lucide-react"
import { toast } from 'react-hot-toast';

import { useParams } from 'next/navigation';


import { UserLogInContext } from '@/components/UserLogInContextBlog';

import { updateUserProfile } from '@/actions/profile';

import { fetchUserLikedPosts } from '@/actions/profile';

export default function UserNameProfilePage() {
    const params = useParams();
    const { userInf } = React.useContext(UserLogInContext);
    const { register, handleSubmit, formState: { errors }, formState: { isDirty, isSubmitting }, reset } = useForm({
        defaultValues: {
            id: params.userid,
            name: userInf.name,
            email: userInf.email,
            location: userInf.location,
            website: userInf.website,
        }
    });

    const [displayProfilePage, setDisplayProfilePage] = React.useState(false); //rememebr to fix this
    const [activityPage, setActivityPage] = React.useState('liked')
    const [likedPosts, setLikedPosts] = React.useState([]);
    const [commentedPosts, setCommentedPosts] = React.useState([]);

    React.useEffect(() => {
        fetchUserLikedPosts({ authorId: params.userid }).then(setLikedPosts);
    }, [])


    async function onSubmit(data) {
        if (isSubmitting) return;
        try {
            const result = await updateUserProfile({ newUserProfile: data });
            if (result.succcess) toast.success("Profile Updated!")
        } catch (error) {
            toast.error("Failed to update User Profile!")
        } finally {
            reset(data);
        }

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
                                    <Input
                                        type="text"
                                        id="website"
                                        placeholder="Website"
                                        {...register("website")}
                                    />
                                </div>
                                <div className='md:col-span-3 row-span-full w-full flex justify-center items-center'>
                                    <Avatar className=" size-24 sm:w-24 sm:h-24">
                                        <AvatarImage src={userInf.image ?? "https://www.gravatar.com/avatar/?d=mp"} />
                                    </Avatar>
                                </div>
                            </div>
                            <Button
                                disabled={isSubmitting || !isDirty}
                                className="my-4 cursor-pointer"
                            >
                                {isSubmitting ?
                                    <div className='w-full flex justify-center items-center h-[200px]'>
                                        <LoaderCircle className='animate-spin' />
                                    </div>
                                    :
                                    "Save"
                                }
                            </Button>
                        </CardContent>
                    </form>
                    :
                    <div>
                        <CardHeader>
                            <CardTitle className="flex justify-start items-center gap-2">
                                <Activity />
                                <h1>Activity</h1>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="mt-2">
                            <div className='flex justify-start items-center gap-1 mb-4'>
                                <Button
                                    variant={`${activityPage === "liked" ? "default" : "ghost"}`}
                                    disabled={activityPage === "liked"}
                                    className="rounded-3xl cursor-pointer"
                                    onClick={() => setActivityPage('liked')}
                                >
                                    Liked
                                </Button>
                                <Button
                                    variant={`${activityPage === "commented" ? "default" : "ghost"}`}
                                    disabled={activityPage === "commented"}
                                    className="rounded-3xl cursor-pointer"
                                    onClick={() => setActivityPage('commented')}
                                >
                                    Commented
                                </Button>
                            </div>
                            <Card
                                className="grid md:grid-cols-2 p-4 brightness-75"
                            >
                                {activityPage === "liked" &&
                                    likedPosts.map((post) => {
                                        return (
                                            <Card
                                                key={post.post.id}
                                                className="brightness-125 bg-card text-card-foreground"
                                            >
                                                <CardContent className="px-4 sm:px-6">
                                                    <div className="flex space-x-3 sm:space-x-4 justify-start items-center">
                                                        <Avatar className="size-8 sm:w-10 sm:h-10">
                                                            <AvatarImage src={post.author.image ?? "/avatar.png"} />
                                                        </Avatar>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex">
                                                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 truncate">
                                                                    <div className="font-semibold truncate">
                                                                        {post.author.name}
                                                                    </div>
                                                                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                                                        <div>
                                                                            @{post.author.username}
                                                                        </div>                         
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardContent>

                                            </Card>
                                        )
                                    })
                                }
                            </Card>

                        </CardContent>
                    </div>
                }
            </Card>
        </div>

    )
}
