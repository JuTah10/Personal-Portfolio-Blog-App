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
    return (
        <Dialog>
            <form className="w-full">
                <DialogTrigger asChild>
                    <Button className="w-full" variant="outline">Continue as Guest</Button>
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
                        >
                            Confirm as Guest
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
