"use client"
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

export function GuestWarning() {
    function generateRandomGuestName() {
        const adjectives = ["Brave", "Clever", "Swift", "Happy", "Calm"];
        const animals = ["Otter", "Panda", "Tiger", "Fox", "Koala"];
        const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
        const animal = animals[Math.floor(Math.random() * animals.length)];
        return `${adj} ${animal}`;
    }

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
                                    name: generateRandomGuestName(),
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
