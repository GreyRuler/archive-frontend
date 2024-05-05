import PropTypes from "prop-types";
import {formatDate} from "@/lib/format.js";

HistoryDeductItem.propTypes = {
    item: PropTypes.object,
}

export default function HistoryDeductItem({item}) {
    return (
        <li className={'flex justify-between py-5 border-b border-gray-200'}>
            <div className={'flex flex-col'}>
                <span>Списано со склада</span>
                <span className={'text-xs'}>{formatDate(item.date)}</span>
            </div>
            <div className={'flex items-center'}>
                <span className={'text-red-600'}>{item.delta}</span>
            </div>
        </li>
    )
}
