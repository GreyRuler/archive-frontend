import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle,} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Form} from "@/components/ui/form.jsx";
import PropTypes from "prop-types";

Modal.propTypes = {
    title: PropTypes.string,
    form: PropTypes.object,
    submit: PropTypes.func,
    isOpen: PropTypes.bool,
    onOpenChange: PropTypes.func,
    children: PropTypes.node,
};

export function Modal({title, form, submit, children, isOpen, onOpenChange}) {
    const onSubmit = (data) => {
        submit(data)
        onOpenChange(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className='flex flex-col max-w-lg max-h-[40rem]'>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col flex-1 overflow-x-auto'>
                        <div className='overflow-x-auto mb-4 p-1'>
                            {children}
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">Отмена</Button>
                            </DialogClose>
                            <Button type="submit">Сохранить</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
