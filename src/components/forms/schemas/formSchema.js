import {z} from "zod";

export const formSchema = (fields) => z.object({
    warehouse: z.string().min(1, {message: 'Обязательное поле'}),
    itemNumber: z.string().min(1, {message: 'Обязательное поле'}),
    itemNumberOld: z.string(),
    name: z.string().min(1, {message: 'Обязательное поле'}),
    amount: z.coerce.number().min(1, {message: 'Обязательное поле'}),
    unit: z.string().min(1, {message: 'Обязательное поле'}),
    date: z.date(),
    metals: z.object({
        name: z.string(),
        value: z.number(),
    }).array(),
    ...fields
}).required()
