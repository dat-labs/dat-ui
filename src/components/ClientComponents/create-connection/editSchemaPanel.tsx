import React, { useContext, useState } from "react";
import DataTable from "../data-table";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FromDataContext } from ".";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";

function EditSchemaPanel({
    jsonSchema,
    name,
    handleStreamConfigurationSave,
    handlePreviousStep,
    handleDialogClose
}: {
    jsonSchema: any;
    name: string;
    handleStreamConfigurationSave: (values: any, streamName: string) => void;
    handlePreviousStep: () => void;
    handleDialogClose: any;
}) {
    const { state } = useContext(FromDataContext);
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

            const updatedUpsertKeys = state.streams[name]?.configuration?.upsert_keys?.filter(
                (key) => key !== fieldName
            );

            const updatedConfiguration = {
                ...state.streams[name].configuration,
                json_schema: newJsonSchema,
                upsert_keys: updatedUpsertKeys, // Update upsert keys

            };

            handleStreamConfigurationSave(updatedConfiguration, name);
            return newSelectedSchemas;
        });
    };

    const handleHeaderSwitchChange = (checked) => {
        const newJsonSchema = checked ? jsonSchema : {};
        if (!checked) {
            state.streams[name].configuration.cursor_field = null;
        }

        const updatedConfiguration = {
            ...state.streams[name].configuration,
            json_schema: newJsonSchema,
        };

        handleStreamConfigurationSave(updatedConfiguration, name);
    };

    const handleUpsertKeyChange = (checked, fieldName) => {
        const currentUpsertKeys = state.streams[name].configuration.upsert_keys || [];
        const newUpsertKeys = checked
            ? [...currentUpsertKeys, fieldName]
            : currentUpsertKeys.filter((key) => key !== fieldName);

        const updatedConfiguration = {
            ...state.streams[name].configuration,
            upsert_keys: newUpsertKeys,
        };

        handleStreamConfigurationSave(updatedConfiguration, name);
    };

    const handleCursorFieldChange = (value) => {
        const updatedConfiguration = {
            ...state.streams[name].configuration,
            cursor_field: value,
        };

        handleStreamConfigurationSave(updatedConfiguration, name);
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
                            onValueChange={(value) => handleCursorFieldChange(value)}
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

    const handleSaveAndClose = () => {
        const config = state.streams[name]?.configuration;

        if (config?.read_sync_mode === "INCREMENTAL" && !config?.cursor_field) {
            toast.error("Please select a cursor field for incremental sync.",{
                className: 'toast-error'
            });
            return;
        }

        if (config?.write_sync_mode === "UPSERT" && (!config?.upsert_keys || config?.upsert_keys.length === 0)) {
            toast.error("Please select at least one upsert key for upsert sync.",{
                className: 'toast-error'
            });
            return;
        }

        handleDialogClose(); 
    };


    const schemaArr = convertToArray(jsonSchema);

    return (
        <div className="p-2">
            <DataTable actorType="Field Name" columns={columns} data={schemaArr} inDialog={true} />
            
            {/* Buttons Section */}
            <div className="mt-4 flex justify-between items-center">
                <Button onClick={handlePreviousStep} className="mr-2">
                    Back
                </Button>
                <Button onClick={handleSaveAndClose}>
                    Save and Close
                </Button>
            </div>
        </div>
    );
}

export default EditSchemaPanel;
