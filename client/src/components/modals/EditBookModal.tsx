import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
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
import { Input } from "@/components/ui/input"
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form"
import { Button } from "../ui/button"
import { SquarePen } from "lucide-react"
import type { IBook } from "@/types"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useUpdateBookMutation } from "@/redux/api/baseApi"

interface EditBookModalProps {
    book: IBook
}

export default function EditBookModal({ book }: EditBookModalProps) {
    const [updateBook] = useUpdateBookMutation()
    const [open, setOpen] = useState(false)

    const form = useForm({
        defaultValues: {
            title: book.title,
            description: book.description,
            author: book.author,
            genre: book.genre,
            isbn: book.isbn,
            
        },
    })

    // Optional: if book is dynamic and may change after mount
    // useEffect(() => {
    //     form.reset({
    //         title: book.title,
    //         description: book.description,
    //         author: book.author,
    //         genre: book.genre,
    //         isbn: book.isbn,
    //         copies: book.copies,
    //     })
    // }, [book, form])

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (!book._id) return toast.error("Book not loaded")
        const updatedBook = {
            ...data,
            copies: Number(data.copies)
        }
        console.log("Submitted data:", updatedBook)
        try {
            await updateBook({ _id: book._id, data: updatedBook })
            toast.success("Book updated")
            setOpen(false)
            // form.reset()
        } catch (error) {
            console.log("Error", error)
            toast.error("Couldn't update the book")
        }
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">
                        <SquarePen />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                            <DialogHeader>
                                <DialogTitle>Edit Book</DialogTitle>
                                <DialogDescription className="sr-only">
                                    Description
                                </DialogDescription>
                            </DialogHeader>

                            {/* Title */}
                            <FormField
                                control={form.control}
                                name="title"
                                rules={{
                                    required: "Title is required"
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Description */}
                            <FormField
                                control={form.control}
                                name="description"
                                rules={{
                                    required: "Description is required"
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Author */}
                            <FormField
                                control={form.control}
                                name="author"
                                rules={{
                                    required: "Author is required"
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Author</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Genre */}
                            <FormField
                                control={form.control}
                                name="genre"
                                rules={{
                                    required: "Genre is required"
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Genre</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* ISBN */}
                            <FormField
                                control={form.control}
                                name="isbn"
                                rules={{
                                    required: "ISBN is required"
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ISBN</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Copies (number only) */}
                            <FormField
                                control={form.control}
                                name="copies"
                                rules={{
                                    min: { value: 1, message: "Must be at least 1" },
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Copies: {book.copies}</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} placeholder="Add copies"/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
