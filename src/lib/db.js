import Dexie from 'dexie';

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

const inventoryColumns = [
    "++id",
    "warehouse",
    "itemNumber",
    "itemNumberOld",
    "name",
    "initialCount",
    // "count",
    "unit",
    "date",
    "metals",
    "history",
    "isArchived",
].join(', ')

export const db = new Dexie('consolidatedWarehouse');
db.version(1).stores({
    inventory: inventoryColumns,
    // warehouses: warehousesColumns,
    // preciousMetals: preciousMetalsColumns,
    // units: unitsColumns,
    // issuedTo : issuedToColumns,
});
