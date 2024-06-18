let jsonData = {
    properties: {
        connection_specification: {
            additionalProperties: false,
            properties: {
                name: {
                    default: "pdf",
                    title: "Name",
                    type: "string",
                    order: 0,
                },
                namespace: {
                    default: null,
                    description: "namespace the data is associated with",
                    title: "Namespace",
                    type: "string",
                    order: 1,
                },
                read_sync_mode: {
                    enum: ["FULL_REFRESH", "INCREMENTAL"],
                    title: "ReadSyncMode",
                    type: "string",
                    order: 2,
                },
                write_sync_mode: {
                    enum: ["APPEND", "UPSERT", "REPLACE"],
                    title: "WriteSyncMode",
                    type: "string",
                    order: 3,
                },
                cursor_field: {
                    default: null,
                    description:
                        "The path to the field used to determine if a record is new or modified.\nREQUIRED for INCREMENTAL sync mode.",
                    title: "Cursor Field",
                    type: "string",
                    order: 4,
                },
                advanced: {
                    properties: {
                        splitter_settings: {
                            title: "Splitter Settings",
                            type: "object",
                            oneOf: [
                                {
                                    properties: {
                                        strategy: {
                                            const: "SPLIT_BY_HTML_HEADER",
                                            title: "Strategy",
                                            type: "string",
                                        },
                                        config: {
                                            properties: {
                                                headers_to_split_on: {
                                                    default: ["h2", "h3"],
                                                    description:
                                                        "list of headers we want to track mapped to (arbitrary) keys for metadata. Allowed header values: h1, h2, h3, h4, h5, h6",
                                                    items: {
                                                        type: "string",
                                                    },
                                                    title: "Headers To Split On",
                                                    type: "string",
                                                },
                                            },
                                            title: "SplitByHtmlHeaderExtraConfig",
                                            type: "object",
                                        },
                                    },
                                    title: "SplitByHtmlHeaderSettings",
                                    type: "object",
                                },
                                {
                                    properties: {
                                        strategy: {
                                            default: "SPLIT_BY_CHARACTER",
                                            title: "Strategy",
                                            type: "string",
                                        },
                                        config: {
                                            properties: {
                                                separator: {
                                                    default: "\\n\\n",
                                                    title: "Separator",
                                                    type: "string",
                                                },
                                            },
                                            title: "SplitByCharacterExtraConfig",
                                            type: "object",
                                        },
                                    },
                                    title: "SplitByCharacterSettings",
                                    type: "object",
                                },
                                {
                                    properties: {
                                        strategy: {
                                            default: "SPLIT_CODE",
                                            title: "Strategy",
                                            type: "string",
                                        },
                                        config: {
                                            properties: {
                                                separators: {
                                                    default: ["\\nclass ", "\\ndef "],
                                                    items: {},
                                                    title: "Separators",
                                                    type: "array",
                                                },
                                            },
                                            title: "SplitCodeExtraConfig",
                                            type: "object",
                                        },
                                    },
                                    title: "SplitCodeSettings",
                                    type: "object",
                                },
                                {
                                    properties: {
                                        strategy: {
                                            default: "SPLIT_BY_MARKDOWN",
                                            title: "Strategy",
                                            type: "string",
                                        },
                                        config: {
                                            default: {},
                                            title: "Config",
                                            type: "object",
                                        },
                                    },
                                    title: "SplitByMarkdownSettings",
                                    type: "object",
                                },
                                {
                                    properties: {
                                        strategy: {
                                            default: "SPLIT_JSON_RECURSIVELY",
                                            title: "Strategy",
                                            type: "string",
                                        },
                                        config: {
                                            default: {},
                                            title: "Config",
                                            type: "object",
                                        },
                                    },
                                    title: "SplitJsonRecursivelySettings",
                                    type: "object",
                                },
                                {
                                    properties: {
                                        strategy: {
                                            default: "SPLIT_BY_CHARACTER_RECURSIVELY",
                                            title: "Strategy",
                                            type: "string",
                                        },
                                        config: {
                                            properties: {
                                                separators: {
                                                    default: ["\n\n", "\n", " ", ""],
                                                    items: {},
                                                    title: "Separators",
                                                    type: "array",
                                                },
                                            },
                                            title: "SplitByCharacterRecursiverlyConfig",
                                            type: "object",
                                        },
                                    },
                                    title: "SplitByCharacterRecursiverlySettings",
                                    type: "object",
                                },
                                {
                                    properties: {
                                        strategy: {
                                            default: "SPLIT_BY_TOKENS",
                                            title: "Strategy",
                                            type: "string",
                                        },
                                        config: {
                                            properties: {
                                                separators: {
                                                    default: ["\n\n", "\n", " ", ""],
                                                    items: {},
                                                    title: "Separators",
                                                    type: "array",
                                                },
                                            },
                                            title: "SplitByCharacterRecursiverlyConfig",
                                            type: "object",
                                        },
                                    },
                                    title: "SplitByTokensSettings",
                                    type: "object",
                                },
                            ],
                        },
                    },
                    title: "Advanced",
                    type: "object",
                    order: 6,
                },
                dir_uris: {
                    items: {
                        type: "string",
                    },
                    title: "Dir Uris",
                    type: "array",
                    order: 5,
                },
            },
            required: ["dir_uris"],
            title: "PdfStream",
            type: "object",
        },
    },
    required: ["connection_specification"],
    title: "GoogleDriveSpecification",
    type: "object",
};

export const getFormDataForSource = async (selectedActor: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/actors/${selectedActor}/spec`);
    const data = await response.json();
    return data;
};

export const getActors = async (actorType: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/actors/${actorType}/list`);
    const data = await response.json();
    return data;
};

export const createActorInstance = async (data: any) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/actor_instances/test_and_save`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return { responseData, status_code: response.status };
};
