import Dexie from 'dexie';

const DB_NAME = 'warehouse'
const DB_VERSION = 1

// const warehousesColumns = [
//     "++id",
//     "name",
// ].join(', ')

// const unitsColumns = [
//     "++id",
//     "name",
// ].join(', ')

// const preciousMetalsColumns = [
//     "++id",
//     "name",
// ].join(', ')

// const issuedToColumns = [
//     "++id",
//     "name",
// ].join(', ')

const warehouseColumns = [
    "++id",
    "warehouse",
    "itemNumber",
    "itemNumberOld",
    "name",
    "amount",
    "decrement",
    "difference",
    "unit",
    "date",
    "metals",
    "history",
    "isArchived",
].join(', ')

export const db = new Dexie(DB_NAME);
db.version(DB_VERSION).stores({
    warehouse: warehouseColumns,
    // warehouses: warehousesColumns,
    // preciousMetals: preciousMetalsColumns,
    // units: unitsColumns,
    // issuedTo : issuedToColumns,
});
