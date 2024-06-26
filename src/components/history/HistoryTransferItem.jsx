import PropTypes from "prop-types";
import FormReturnItem from "@/components/forms/FormReturnItem.jsx";
import {formatDate} from "@/lib/format.js";

HistoryTransferItem.propTypes = {
    item: PropTypes.object,
}

export default function HistoryTransferItem({item}) {
    return (
        <li className={'flex justify-between items-center py-5 border-b border-gray-200'}>
            <div className={'flex flex-col overflow-x-hidden'}>
                <span>Выдано со склада</span>
                <span className={'overflow-ellipsis overflow-hidden whitespace-nowrap'}
                      title={item.employer}>{item.employer}</span>
                <span className={'text-xs'}>{formatDate(item.date)}</span>
            </div>
            {item.return
                ? <span className={'text-green-600 text-base'}>+{item.delta}</span>
                : <FormReturnItem delta={item.delta} employer={item.employer}  historyId={item.id}/>}
        </li>
    )
}
