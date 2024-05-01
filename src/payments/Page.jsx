import {DataTable} from "@/components/table/DataTable.jsx";
import {columnsArchive, columnsWarehouse} from "./columns.jsx"
import {db} from "@/lib/db.js";
import {useLiveQuery} from "dexie-react-hooks";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";
import TestPage from "@/test/TestPage.jsx";

export function Page() {
    const warehouse = useLiveQuery(() => {
        return db.warehouse.where({isArchived: 0}).toArray()
    })
    const archive = useLiveQuery(() => {
        return db.warehouse.where({isArchived: 1}).toArray()
    })

    return (
        <Tabs defaultValue="warehouse" className='container max-w-full py-10 h-screen flex flex-col'>
            <TabsList>
                <TabsTrigger value="warehouse">Склад</TabsTrigger>
                <TabsTrigger value="archive">Архив</TabsTrigger>
                <TabsTrigger value="test">test</TabsTrigger>
            </TabsList>
            <TabsContent value="warehouse" className="flex-1">
                <DataTable columns={columnsWarehouse} data={warehouse ?? []}/>
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
