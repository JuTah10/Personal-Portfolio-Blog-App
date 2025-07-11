"use client"
import React from "react";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator';

export function GuestWarning() {
    const [randomName, setRandomName] = React.useState("");

    React.useEffect(() => {
        const name = uniqueNamesGenerator({
            dictionaries: [adjectives, animals],
            separator: ' ',
            style: 'capital'
        });
        setRandomName(name);
    }, []);


    return (
        <Dialog>
            <form className="w-full">
                <DialogTrigger asChild>
                    <Button className="w-full cursor-pointer" variant="outline">Continue as Guest</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Continue as Guest</DialogTitle>
                        <DialogDescription>
                            If you continue as a guest, your data will only be stored temporarily on this device.
                            <br />
                            You may lose your progress after logging out or switching browsers. For a more reliable experience, consider creating an account.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            className="cursor-pointer"
                            onClick={() => {
                                const guestId = `guest_${crypto.randomUUID()}`
                                
                                const guestInfo = {
                                    guestId,
                                    name: randomName,
                                    email: `${guestId}@guest.local`,
                                    image: "https://www.gravatar.com/avatar/?d=mp"
                                };
                                

                                document.cookie = `guestInf=${encodeURIComponent(JSON.stringify(guestInfo))}; path=/; max-age=604800`;
                                window.location.reload();
                            }}

                        >
                            Confirm as Guest
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
