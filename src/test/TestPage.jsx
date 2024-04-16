import MultiselectForm from "@/components/forms/fields/MultiselectForm.jsx";
import {Form} from "@/components/ui/form.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Button} from "@/components/ui/button.jsx";

export const formSchema = z.object({
    preciousMetals: z.object({
        name: z.string(),
        value: z.number(),
    }).array(),
}).required()

export default function TestPage() {
    const values = [
        'Золото',
        'Серебро',
        'Цинк',
        'Медь',
    ]

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            preciousMetals: [
                {
                    name: "Золото",
                    value: 10,
                }
            ]
        },
    })

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <MultiselectForm form={form} name={'preciousMetals'} label={'Выбор металлов'} placeholder={'Нажмите для выбора'} values={values}/>
                <Button variant="secondary" type="submit">Submit</Button>
            </form>
        </Form>
    )
}
