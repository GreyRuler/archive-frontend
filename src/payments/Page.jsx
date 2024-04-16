import {DataTable} from "@/components/ui/data-table.jsx";
import {columnsArchive, columnsInventory} from "./columns.jsx"
import {db} from "@/lib/db.js";
import {useLiveQuery} from "dexie-react-hooks";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";
import {balance, formatDate} from "@/lib/format.js";
import TestPage from "@/test/TestPage.jsx";

export function Page() {
    const formatData = items => items.map(item => ({
        ...item,
        date: formatDate(item.date),
        count: balance(item.initialCount, item.history),
    }))
    const inventory = useLiveQuery(() => {
        return db.inventory.where({isArchived: 0}).toArray(formatData)
    })
    const archive = useLiveQuery(() => {
        return db.inventory.where({isArchived: 1}).toArray(formatData)
    })

    return (
        <Tabs defaultValue="inventory" className='container mx-auto py-10 h-screen flex flex-col'>
            <TabsList>
                <TabsTrigger value="inventory">Инвентарь</TabsTrigger>
                <TabsTrigger value="archive">Архив</TabsTrigger>
                <TabsTrigger value="test">test</TabsTrigger>
            </TabsList>
            <TabsContent value="inventory" className="flex-1">
                <DataTable columns={columnsInventory} data={inventory ?? []}/>
            </TabsContent>
            <TabsContent value="archive" className="flex-1">
                <DataTable columns={columnsArchive} data={archive ?? []}/>
            </TabsContent>
            <TabsContent value="test" className="flex-1">
                <TestPage/>
            </TabsContent>
        </Tabs>
    )
}
