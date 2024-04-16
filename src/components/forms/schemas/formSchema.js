import {z} from "zod";

export const formSchema = z.object({
    warehouse: z.string().min(1, {message: 'Обязательное поле'}),
    itemNumber: z.string().min(1, {message: 'Обязательное поле'}),
    itemNumberOld: z.string(),
    name: z.string().min(1, {message: 'Обязательное поле'}),
    initialCount: z.coerce.number().min(1, {message: 'Обязательное поле'}),
    count: z.coerce.number(),
    unit: z.string().min(1, {message: 'Обязательное поле'}),
    date: z.date(),
    metals: z.object({
        name: z.string(),
        value: z.number(),
    }).array(),
}).required()
