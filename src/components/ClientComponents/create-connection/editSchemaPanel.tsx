import React from "react";
import DataTable from "../data-table";

function EditSchemaPanel({ jsonSchema }: { jsonSchema: any }) {
    const columns = [
        {
            accessor: "name",
            header: "Field Name",
        },
        {
            accessor: "data_type",
            header: "DataType",
        },
        {
            accessor: "cursor_field",
            header: "Cursor Field",
        },
    ];

    return (
        <div className="px-2">
            <DataTable actorType="Schema" columns={columns} data={jsonSchema} />
        </div>
    );
}

export default EditSchemaPanel;
