import {faker} from '@faker-js/faker/locale/ru';
import {warehouses} from "@/lib/warehouses.js";
import {units} from "@/lib/units.js";

const getRandomWarehouse = () => {
    return warehouses[Math.floor(Math.random() * warehouses.length)];
};

const getRandomUnit = () => {
    return units[Math.floor(Math.random() * units.length)];
};

const formatDate = (date) => {
    const d = new Date(date);
    return Intl.DateTimeFormat('ru-RU').format(d);
}

const count = (initialCount) => {
    return initialCount - faker.number.bigInt({ min: 1, max: initialCount });
}

const generateFakeData = (id) => {
    const unit = getRandomUnit()
    const initialCount = faker.number.bigInt({ min: 1, max: 10 })
    return {
        id,
        warehouse: getRandomWarehouse(),
        itemNumber: faker.commerce.isbn(),
        itemNumberOld: faker.commerce.isbn(),
        name: faker.commerce.productName(),
        initialCount: initialCount,
        count: count(initialCount),
        unit: unit,
        issuedTo: faker.person.fullName(),
        dateOfReceipt: formatDate(faker.date.recent()),
        preciousMetals: Math.random() < 0.5,
        transfer: faker.person.fullName(),
        transferDate: formatDate(faker.date.recent()),
    };
};

const fakeData = [];
for (let i = 1; i <= 100; i++) {
    fakeData.push(generateFakeData(i));
}

export default fakeData
