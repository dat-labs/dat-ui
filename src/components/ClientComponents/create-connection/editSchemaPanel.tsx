import React, { useContext, useState } from "react";
import DataTable from "../data-table";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FromDataContext } from ".";

function EditSchemaPanel({ jsonSchema, name }: { jsonSchema: any; name: string }) {
    const { state, updateState } = useContext(FromDataContext);
    const [selectedSchemas, setSelectedSchemas] = useState([]);
    
    const handleSwitchChange = (checked, fieldName, typeName) => {
        setSelectedSchemas((prevSelectedSchemas) => {
            let newSelectedSchemas;
            if (checked) {
                newSelectedSchemas = [...prevSelectedSchemas, { [fieldName]: { type: typeName } }];
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
                if (state.streams[name]?.configuration?.cursor_field === fieldName) {
                    state.streams[name].configuration.cursor_field = null;
                }
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

    const handleHeaderSwitchChange = (checked) => {
        const newJsonSchema = checked ? jsonSchema : {};

        if (!checked) {
            state.streams[name].configuration.cursor_field = null;
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
    };

    const handleUpsertKeyChange = (checked, fieldName) => {
        const currentUpsertKeys = state.streams[name].configuration.upsert_keys || [];
    
        const newUpsertKeys = checked
            ? [...currentUpsertKeys, fieldName]
            : currentUpsertKeys.filter((key) => key !== fieldName);
    
        updateState("streams", {
            ...state.streams,
            [name]: {
                ...state.streams[name],
                configuration: {
                    ...state.streams[name].configuration,
                    upsert_keys: newUpsertKeys, 
                },
            },
        });
    };
    

    const isUpsertKeyChecked = (fieldName) => {
        return state.streams[name]?.configuration?.upsert_keys?.includes(fieldName);
    };

    const isChecked = (fieldName) => {
        return state.streams[name]?.configuration?.json_schema?.hasOwnProperty(fieldName);
    };

    const isCheckedAll = () => {
        const curSchema = state.streams[name]?.configuration?.json_schema;
        return Object.keys(jsonSchema).every((field) => curSchema?.hasOwnProperty(field));
    };

    const columns = [
        {
            id: "configured",
            header: ({ row }: { row: any }) => {
                const checked = isCheckedAll();
                return (
                    <div className="flex items-center space-x-2">
                        <span>Configured</span>
                        <Switch
                            id={`header-configure-${row?.id}`}
                            checked={checked}
                            onClick={() => handleHeaderSwitchChange(!checked)}
                        />
                    </div>
                );
            },
            cell: ({ row }: { row: any }) => {
                const fieldName = row.original?.name;
                const typeName = row.original?.type;
                const checked = isChecked(fieldName);
                return (
                    <div className="flex items-center space-x-2">
                        <Switch
                            id={`configure-${row?.id}`}
                            checked={checked}
                            onClick={() => {
                                handleSwitchChange(!checked, fieldName, typeName);
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
                const fieldName = row.original?.name;
                return (
                    <div className="flex items-center space-x-2">
                        <RadioGroup
                            disabled={!state.streams[name]?.configuration?.json_schema?.hasOwnProperty(fieldName)}
                            value={state.streams[name]?.configuration?.cursor_field}
                            onValueChange={(value) => {
                                updateState("streams", {
                                    ...state.streams,
                                    [name]: {
                                        ...state.streams[name],
                                        configuration: {
                                            ...state.streams[name].configuration,
                                            cursor_field: value,
                                        },
                                    },
                                });
                            }}
                        >
                            <RadioGroupItem value={fieldName} id={`cursor-${fieldName}`} />
                        </RadioGroup>
                    </div>
                );
            },
        },
        {
            header: "Upsert Key", 
            cell: ({ row }: { row: any }) => {
                const fieldName = row.original?.name;
                const checked = isUpsertKeyChecked(fieldName);
                return (
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            checked={checked}
                            onCheckedChange={(checked) => handleUpsertKeyChange(checked, fieldName)}
                            disabled={!state.streams[name]?.configuration?.json_schema?.hasOwnProperty(fieldName)} 
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
            <DataTable actorType="Field Name" columns={columns} data={schemaArr} inDialog={true} />
        </div>
    );
}

export default EditSchemaPanel;
