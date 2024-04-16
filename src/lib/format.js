import {ru} from "date-fns/locale";
import {format} from "date-fns";

const formatStr = "dd.MM.yyyy"

export function formatDate(date) {
    return format(date, formatStr, {locale: ru})
}

export function balance(total, items) {
    return items.reduce((acc, item) => acc + item.delta, total)
}
