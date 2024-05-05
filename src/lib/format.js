import {ru} from "date-fns/locale";
import {format} from "date-fns";

const formatStr = "dd.MM.yyyy"

export function formatDate(date) {
    try {
        return format(date, formatStr, {locale: ru})
    } catch (e) {
        return date
    }
}
