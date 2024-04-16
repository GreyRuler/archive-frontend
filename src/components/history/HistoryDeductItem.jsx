import PropTypes from "prop-types";

HistoryDeductItem.propTypes = {
    item: PropTypes.object,
}

export default function HistoryDeductItem({item}) {
    return (
        <li className={'flex justify-between py-5 border-b border-gray-200'}>
            <div className={'flex flex-col'}>
                <span>Списано со склада</span>
                <span className={'text-xs'}>{(new Date()).toDateString()}</span>
            </div>
            <div className={'flex items-center'}>
                <span className={'text-red-600'}>{item.delta}</span>
            </div>
        </li>
    )
}
