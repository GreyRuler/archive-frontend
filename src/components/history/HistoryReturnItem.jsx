import PropTypes from "prop-types";
import {formatDate} from "@/lib/format.js";

HistoryReturnItem.propTypes = {
    item: PropTypes.object,
}

export default function HistoryReturnItem({item}) {
    return (
        <li className={'flex justify-between py-5 border-b border-gray-200'}>
            <div className={'flex flex-col overflow-x-hidden'}>
                <span>Возвращено на склад</span>
                <span className={'overflow-ellipsis overflow-hidden whitespace-nowrap'}
                      title={item.employer}>{item.employer}</span>
                <span className={'text-xs'}>{formatDate(item.date)}</span>
            </div>
            <div className={'flex items-center ml-4'}>
                <span className={'text-red-600'}>-{item.delta}</span>
            </div>
        </li>
    )
}
