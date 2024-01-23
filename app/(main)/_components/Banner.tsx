"use client"

import ConfirmModel from "@/components/modals/ConfirmModel"
import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useMutation } from "convex/react"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface BannerProps { 
    documentId: Id<"documents">
}
const Banner = ({
    documentId
}:BannerProps) => {
    const router = useRouter();
    const remove = useMutation(api.documents.remove);
    const restore = useMutation(api.documents.restore);
    
    const onRestore = () => {
        const promise = restore({id: documentId});

        toast.promise(promise, {
            loading: "Restoring note..",
            success: "Note restored!",
            error: "Failed to restore note..."
        })
    }

    const onRemove = () => {
        const promise = remove({id: documentId});

        toast.promise(promise, {
            loading: "Deleting note..",
            success: "Note deleted!",
            error: "Failed to delete note..."
        });
        router.push("/documents");
    }


  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
        <p className="flex gap-x-2 items-center">This note is in the<Trash className="h-3 w-3 text-white"/>Trash.</p>
        <Button
            size="sm"
            onClick={onRestore}
            variant="outline"
            className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
        >
            Restore note
        </Button>
        <ConfirmModel onConfirm={onRemove}>
            <Button
                size="sm"
                variant="outline"
                className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
            >
                Delete forever
            </Button>
        </ConfirmModel>

    </div>
  )
}

export default Banner