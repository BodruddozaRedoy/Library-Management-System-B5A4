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
import { CalendarIcon } from "lucide-react"
import type { IBook, IBorrow } from "@/types"
import {  useState } from "react"
import toast from "react-hot-toast"
import { useCreateBorrowMutation } from "@/redux/api/baseApi"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { cn } from "@/lib/utils"
import { Calendar } from "../ui/calendar"
import { format } from "date-fns"

interface BorrowModal {
    book: IBook
}

export default function BorrowModal({ book }: BorrowModal) {
    const [createBorrow] = useCreateBorrowMutation()
    const [open, setOpen] = useState(false)

    const form = useForm()


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if(data.quantity > book.copies) return toast.error("Not enough copies for borrowed")
        if(!book._id) return toast.error("Book info not found")
        const borrowedData:IBorrow = {
            book:book._id,
            quantity: Number(data.quantity),
            dueDate: data.dueDate
        }
        console.log(borrowedData)
        try {
            const res = await createBorrow(borrowedData).unwrap()
            console.log(res)
            toast.success("Book Borrowed") 
            setOpen(false)
        } catch (error) {
            toast.error("Couldn't borrowed the book")
        }
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="hover:text-primary" variant="outline">
                        Borrow
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                            <DialogHeader>
                                <DialogTitle>Borrow the Book</DialogTitle>
                                <DialogDescription className="sr-only">
                                    Description
                                </DialogDescription>
                            </DialogHeader>

                            <FormField
                                control={form.control}
                                name="quantity"
                                rules={{
                                    required: "Quantity is required",
                                    min: { value: 1, message: "Must be at least 1" }
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Quantity</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="number" placeholder="Type borrowed quantity" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="dueDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Due Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() || date < new Date("1900-01-01")
                                                    }
                                                    captionLayout="dropdown"
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Borrow</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
