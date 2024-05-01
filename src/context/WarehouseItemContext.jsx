import {createContext, useContext} from "react";
import PropTypes from "prop-types";

const WarehouseItemContext = createContext(null);

export const WarehouseItemProvider = ({value, children }) => {
    return <WarehouseItemContext.Provider value={value}>
        {children}
    </WarehouseItemContext.Provider>;
}

WarehouseItemProvider.propTypes = {
    value: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
}

export const useWarehouseItemContext = () => useContext(WarehouseItemContext);
