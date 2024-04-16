import PropTypes from "prop-types";
import {warehouses} from "@/lib/warehouses.js";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";

FilterHeaderDatalist.propTypes = {
    column: PropTypes.object.isRequired,
};

export default function FilterHeaderDatalist({column}) {
    const onValueChange = (value) => {
        if (value === 'all') {
            column.setFilterValue(null)
        } else {
            column.setFilterValue(value)
        }
    }

    return (
        <Select defaultValue='all' onValueChange={onValueChange}>
            <SelectTrigger>
                <SelectValue/>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">Всё</SelectItem>
                {warehouses.map((warehouse, index) => (
                    <SelectItem value={warehouse} key={index}>{warehouse}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
