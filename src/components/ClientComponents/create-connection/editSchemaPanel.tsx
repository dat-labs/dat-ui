import React, { useContext, useEffect, useState } from "react";
import DataTable from "../data-table";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FromDataContext } from ".";

function EditSchemaPanel({ jsonSchema, name }: { jsonSchema: any; name: string }) {
    const { state, updateState } = React.useContext(FromDataContext);

    const [selectedSchemas, setSelectedSchemas] = useState([]);

    const handleSwitchChange = (checked, fieldName, typeName) => {
        setSelectedSchemas((prevSelectedSchemas) => {
            let newSelectedSchemas;
            if (checked) {
                newSelectedSchemas = [...prevSelectedSchemas, { [fieldName]: typeName }];
            } else {
                newSelectedSchemas = prevSelectedSchemas.filter((schema) => !schema.hasOwnProperty(fieldName));
            }

            const newJsonSchema = newSelectedSchemas.reduce(
                (acc, curr) => {
                    const key = Object.keys(curr)[0];
                    acc[key] = curr[key];
                    return acc;
                },
                { ...state.streams[name]?.configuration?.json_schema }
            );

            if (!checked) {
                delete newJsonSchema[fieldName];
            }

            updateState("streams", {
                ...state.streams,
                [name]: {
                    ...state.streams[name],
                    configuration: {
                        ...state.streams[name].configuration,
                        json_schema: newJsonSchema,
                    },
                },
            });

            return newSelectedSchemas;
        });
    };

    const isChecked = (fieldName) => {
        return state.streams[name]?.configuration?.json_schema?.hasOwnProperty(fieldName);
    };

    const columns = [
        {
            header: "Configured",
            cell: ({ row }: { row: any }) => {
                const fieldName = row.original?.name;
                const typeName = row.original?.type;
                const checked = !isChecked(fieldName);
                return (
                    <div className="flex items-center space-x-2">
                        <Switch
                            id={`configure-${row?.id}`}
                            checked={checked}
                            onClick={() => {
                                handleSwitchChange(checked, fieldName, typeName);
                            }}
                        />
                    </div>
                );
            },
        },
        {
            accessorKey: "name",
            header: "Field Name",
        },
        {
            accessorKey: "type",
            header: "DataType",
        },
        {
            header: "Cursor Field",
            cell: ({ row }: { row: any }) => {
                return (
                    <div className="flex items-center space-x-2">
                        <Switch
                            id={`cursor-${row.original.name}`}
                            checked={state.streams[name]?.configuration?.cursor_field === row.original.name}
                            onCheckedChange={(ch: any) => {
                                updateState("streams", {
                                    ...state.streams,
                                    [name]: {
                                        ...state.streams[name],
                                        configuration: {
                                            ...state.streams[name].configuration,
                                            cursor_field: row.original.name,
                                        },
                                    },
                                });
                            }}
                        />
                    </div>
                );
            },
        },
    ];

    const convertToArray = (obj) => {
        return Object.entries(obj).map(([key, value]) => ({
            configuration: false,
            name: key,
            type: value?.type,
        }));
    };

    const schemaArr = convertToArray(jsonSchema);

    return (
        <div className="p-2">
            <DataTable actorType="Field Name" columns={columns} data={schemaArr} />
        </div>
    );
}

export default EditSchemaPanel;
