import PropTypes from "prop-types";
import HistoryReturnItem from "@/components/history/HistoryReturnItem.jsx";
import {v4 as uuidv4} from "uuid";
import HistoryTransferItem from "@/components/history/HistoryTransferItem.jsx";
import HistoryDeductItem from "@/components/history/HistoryDeductItem.jsx";
import ActionTypes from "@/lib/actionTypes.js";

HistoryList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
}

const historyComponentsByType = {
    [ActionTypes.RETURN]: HistoryReturnItem,
    [ActionTypes.TRANSFER]: HistoryTransferItem,
    [ActionTypes.DEDUCT]: HistoryDeductItem,
}

export default function HistoryList({items}) {
    return (
        <ul role={'list'} className={'divide-y divide-gray-100 overflow-x-hidden'}>
            {items.map(item => {
                const HistoryItem = historyComponentsByType[item.actionType]
                return <HistoryItem item={item} key={uuidv4()} />
            })}
        </ul>
    )
}
