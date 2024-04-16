import {createContext, useContext} from "react";
import PropTypes from "prop-types";

const InventoryContext = createContext(null);

export const InventoryProvider = ({value, children }) => {
    return <InventoryContext.Provider value={value}>
        {children}
    </InventoryContext.Provider>;
}

InventoryProvider.propTypes = {
    value: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
}

export const useInventoryContext = () => useContext(InventoryContext);
