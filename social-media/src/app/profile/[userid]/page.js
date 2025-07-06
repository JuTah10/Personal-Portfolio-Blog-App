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
import ProfilePagePosts from '@/components/ProfilePagePosts';

import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { UserLogInContext } from '@/components/UserLogInContextBlog';

import { updateUserProfile } from '@/actions/profile';

import { fetchUserLikedPosts } from '@/actions/profile';
import { fetchUserCommentedPosts } from '@/actions/profile';

export default function UserNameProfilePage() {
    const params = useParams();
    const router = useRouter();
    const { userInf } = React.useContext(UserLogInContext);
    const { register, handleSubmit, formState: { errors }, formState: { isDirty, isSubmitting }, reset } = useForm({
        defaultValues: {
            id: params.userid,
            name: userInf?.name,
            email: userInf?.email,
            location: userInf?.location,
            website: userInf?.website,
        }
    });

    const [displayProfilePage, setDisplayProfilePage] = React.useState(true); //rememebr to fix this
    const [loading, setLoading] = React.useState(false);
    const [activityPage, setActivityPage] = React.useState('liked')
    const [posts, setPosts] = React.useState([])

    React.useEffect(() => {
        if (userInf === undefined || params?.userid === undefined);

        if (!userInf) {
            router.replace('/blog');
            return;
        }

        if (userInf.id !== params.userid) {
            router.back();
        }
    }, [userInf, params?.userid]);


    React.useEffect(() => {
        setLoading(true);
        setPosts([]);
        if (activityPage === "liked") {
            fetchUserLikedPosts({ authorId: params.userid }).then((data) => {
                setPosts(data);
                setLoading(false);
            });

        }
        else if (activityPage === "commented") {
            fetchUserCommentedPosts({ authorId: params.userid }).then((data) => {
                setPosts(data);
                setLoading(false);
            });
            setLoading(false);
        };

    }, [activityPage])


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

    console.log(userInf)
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
                                    <Input disabled type="email" id="email" placeholder={userInf?.email} />
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
                                        disabled={userInf?.email.startsWith("guest_")}
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
                                        disabled={userInf?.email.startsWith("guest_")}
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
                                        disabled={userInf?.email.startsWith("guest_")}
                                        {...register("website")}
                                    />
                                </div>
                                <div className='md:col-span-3 row-span-full w-full flex flex-col justify-center items-center'>
                                    <Avatar className=" size-24 sm:w-24 sm:h-24">
                                        <AvatarImage src={userInf?.image ?? "https://www.gravatar.com/avatar/?d=mp"} />
                                    </Avatar>
                                    {userInf?.email.startsWith("guest_") &&
                                        <div className='text-red-500 mt-1'>Create a real user account to edit your profile</div>
                                    }

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
                            {loading ?
                                <div className='flex justify-center items-center h-[200px]'>
                                    <LoaderCircle className='animate-spin' />
                                </div>
                                :
                                <ProfilePagePosts
                                    posts={posts}
                                    type={activityPage}
                                />
                            }

                        </CardContent>
                    </div>
                }
            </Card>
        </div>

    )
}
