import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import PropTypes from "prop-types";
import HistoryList from "@/components/history/HistoryList.jsx";
import {ScrollArea} from "@/components/ui/scroll-area.jsx";

History.propTypes = {
    isOpen: PropTypes.bool,
    onOpenChange: PropTypes.func,
    history: PropTypes.arrayOf(PropTypes.object),
}

export default function History({isOpen, onOpenChange, history}) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md max-h-[80%]">
                <DialogHeader>
                    <DialogTitle>История</DialogTitle>
                    <DialogDescription>
                        Здесь вы найдете информацию о списаниях, передачах и возвратах на склад.
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[80vh] rounded-md border px-3">
                    <HistoryList items={history}/>
                </ScrollArea>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Закрыть</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
