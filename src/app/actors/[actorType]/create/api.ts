const jsonData = {
    properties: {
        documentationUrl: "https://docs.airbyte.com/integrations/sources/mysql",
        connection_specification: {
            $schema: "http://json-schema.org/draft-07/schema#",
            title: "MySql Source Spec",
            type: "object",
            required: ["host", "port", "database", "username", "replication_method"],
            properties: {
                name: {
                    title: "name",
                    description: "The name of the document stream.",
                    type: "string",
                },
                namespace: {
                    title: "name",
                    description: "The namespace the data is associated with.",
                    type: "string",
                    nullable: true,
                },
                json_schema: {
                    title: "name",
                    description: "The JSON schema for the document stream.",
                    type: "string",
                    nullable: true,
                },
                cursor_field: {
                    title: "Cursor Field",
                    description:
                        "The path to the field used to determine if a record is new or modified.\nREQUIRED for INCREMENTAL sync mode.",
                    type: "string",
                    nullable: true,
                },
                ssl_mode: {
                    title: "SSL modes",
                    description:
                        'SSL connection modes. Read more <a href="https://dev.mysql.com/doc/connector-j/8.0/en/connector-j-reference-using-ssl.html"> in the docs</a>.',
                    type: "object",
                    order: 7,
                    oneOf: [
                        {
                            title: "Preferred",
                            description:
                                "Automatically attempt SSL connection. If the MySQL server does not support SSL, continue with a regular connection.",
                            required: ["mode"],
                            properties: {
                                ssl_mode: {
                                    type: "string",
                                    const: "preferred",
                                    order: 0,
                                },
                            },
                        },
                        {
                            title: "required",
                            description:
                                "Always connect with SSL. If the MySQL server doesn't support SSL, the connection will not be established. Certificate Authority (CA) and Hostname are not verified.",
                            required: ["mode"],
                            properties: {
                                ssl_mode: {
                                    type: "string",
                                    const: "required",
                                    order: 0,
                                },
                            },
                        },
                        {
                            title: "Verify CA",
                            description:
                                "Always connect with SSL. Verifies CA, but allows connection even if Hostname does not match.",
                            required: ["mode", "ca_certificate"],
                            properties: {
                                ssl_mode: {
                                    type: "string",
                                    const: "verify_ca",
                                    order: 0,
                                },
                                ca_certificate: {
                                    type: "string",
                                    title: "CA certificate",
                                    description: "CA certificate",
                                    airbyte_secret: true,
                                    multiline: true,
                                    order: 1,
                                },
                                client_certificate: {
                                    type: "string",
                                    title: "Client certificate",
                                    description:
                                        "Client certificate (this is not a required field, but if you want to use it, you will need to add the <b>Client key</b> as well)",
                                    airbyte_secret: true,
                                    multiline: true,
                                    order: 2,
                                    always_show: true,
                                },
                                client_key: {
                                    type: "string",
                                    title: "Client key",
                                    description:
                                        "Client key (this is not a required field, but if you want to use it, you will need to add the <b>Client certificate</b> as well)",
                                    airbyte_secret: true,
                                    multiline: true,
                                    order: 3,
                                    always_show: true,
                                },
                                client_key_password: {
                                    type: "string",
                                    title: "Client key password",
                                    description:
                                        "Password for keystorage. This field is optional. If you do not add it - the password will be generated automatically.",
                                    airbyte_secret: true,
                                    order: 4,
                                },
                            },
                        },
                        {
                            title: "Verify Identity",
                            description: "Always connect with SSL. Verify both CA and Hostname.",
                            required: ["mode", "ca_certificate"],
                            properties: {
                                ssl_mode: {
                                    type: "string",
                                    const: "verify_identity",
                                    order: 0,
                                },
                                ca_certificate: {
                                    type: "string",
                                    title: "CA certificate",
                                    description: "CA certificate",
                                    airbyte_secret: true,
                                    multiline: true,
                                    order: 1,
                                },
                                client_certificate: {
                                    type: "string",
                                    title: "Client certificate",
                                    description:
                                        "Client certificate (this is not a required field, but if you want to use it, you will need to add the <b>Client key</b> as well)",
                                    airbyte_secret: true,
                                    multiline: true,
                                    order: 2,
                                    always_show: true,
                                },
                                client_key: {
                                    type: "string",
                                    title: "Client key",
                                    description:
                                        "Client key (this is not a required field, but if you want to use it, you will need to add the <b>Client certificate</b> as well)",
                                    airbyte_secret: true,
                                    multiline: true,
                                    order: 3,
                                    always_show: true,
                                },
                                client_key_password: {
                                    type: "string",
                                    title: "Client key password",
                                    description:
                                        "Password for keystorage. This field is optional. If you do not add it - the password will be generated automatically.",
                                    airbyte_secret: true,
                                    order: 4,
                                },
                            },
                        },
                    ],
                },
                advanced: {
                    title: "Advanced settings",
                    description: "Additional optional settings",
                    type: "object",
                    properties: {
                        cursor_field: {
                            description:
                                "The path to the field used to determine if a record is new or modified.\nREQUIRED for INCREMENTAL sync mode.",
                            type: "string",
                            title: "Cursor Field",
                            nullable: true,
                        },
                        ssl_mode: {
                            title: "SSL modes",
                            description:
                                'SSL connection modes. Read more <a href="https://dev.mysql.com/doc/connector-j/8.0/en/connector-j-reference-using-ssl.html"> in the docs</a>.',
                            type: "object",
                            order: 7,
                            oneOf: [
                                {
                                    title: "preferred",
                                    description:
                                        "Automatically attempt SSL connection. If the MySQL server does not support SSL, continue with a regular connection.",
                                    required: ["mode"],
                                    properties: {
                                        mode: {
                                            type: "string",
                                            const: "preferred",
                                            order: 0,
                                        },
                                    },
                                },
                                {
                                    title: "required",
                                    description:
                                        "Always connect with SSL. If the MySQL server doesn't support SSL, the connection will not be established. Certificate Authority (CA) and Hostname are not verified.",
                                    required: ["mode"],
                                    properties: {
                                        mode: {
                                            type: "string",
                                            const: "required",
                                            order: 0,
                                        },
                                    },
                                },
                                {
                                    title: "Verify CA",
                                    description:
                                        "Always connect with SSL. Verifies CA, but allows connection even if Hostname does not match.",
                                    required: ["mode", "ca_certificate"],
                                    properties: {
                                        mode: {
                                            type: "string",
                                            const: "verify_ca",
                                            order: 0,
                                        },
                                        ca_certificate: {
                                            type: "string",
                                            title: "CA certificate",
                                            description: "CA certificate",
                                            airbyte_secret: true,
                                            multiline: true,
                                            order: 1,
                                        },
                                        client_certificate: {
                                            type: "string",
                                            title: "Client certificate",
                                            description:
                                                "Client certificate (this is not a required field, but if you want to use it, you will need to add the <b>Client key</b> as well)",
                                            airbyte_secret: true,
                                            multiline: true,
                                            order: 2,
                                            always_show: true,
                                        },
                                        client_key: {
                                            type: "string",
                                            title: "Client key",
                                            description:
                                                "Client key (this is not a required field, but if you want to use it, you will need to add the <b>Client certificate</b> as well)",
                                            airbyte_secret: true,
                                            multiline: true,
                                            order: 3,
                                            always_show: true,
                                        },
                                        client_key_password: {
                                            type: "string",
                                            title: "Client key password",
                                            description:
                                                "Password for keystorage. This field is optional. If you do not add it - the password will be generated automatically.",
                                            airbyte_secret: true,
                                            order: 4,
                                        },
                                        ca_advanced: {
                                            title: "CA Advanced settings",
                                            description: "CA Additional optional settings",
                                            type: "object",
                                            properties: {
                                                cursor_field_ca: {
                                                    description:
                                                        "The path to the field used to determine if a record is new or modified.\nREQUIRED for INCREMENTAL sync mode.",
                                                    type: "string",
                                                    title: "Cursor Field",
                                                    nullable: true,
                                                },
                                            },
                                        },
                                    },
                                },
                                {
                                    title: "Verify Identity",
                                    description: "Always connect with SSL. Verify both CA and Hostname.",
                                    required: ["mode", "ca_certificate"],
                                    properties: {
                                        mode: {
                                            type: "string",
                                            const: "verify_identity",
                                            order: 0,
                                        },
                                        ca_certificate: {
                                            type: "string",
                                            title: "CA certificate",
                                            description: "CA certificate",
                                            airbyte_secret: true,
                                            multiline: true,
                                            order: 1,
                                        },
                                        client_certificate: {
                                            type: "string",
                                            title: "Client certificate",
                                            description:
                                                "Client certificate (this is not a required field, but if you want to use it, you will need to add the <b>Client key</b> as well)",
                                            airbyte_secret: true,
                                            multiline: true,
                                            order: 2,
                                            always_show: true,
                                        },
                                        client_key: {
                                            type: "string",
                                            title: "Client key",
                                            description:
                                                "Client key (this is not a required field, but if you want to use it, you will need to add the <b>Client certificate</b> as well)",
                                            airbyte_secret: true,
                                            multiline: true,
                                            order: 3,
                                            always_show: true,
                                        },
                                        client_key_password: {
                                            type: "string",
                                            title: "Client key password",
                                            description:
                                                "Password for keystorage. This field is optional. If you do not add it - the password will be generated automatically.",
                                            airbyte_secret: true,
                                            order: 4,
                                        },
                                    },
                                },
                            ],
                        },
                        //     type: "object",
                        //     oneOf: [
                        //         {
                        //             type: "object",
                        //             properties: {
                        //                 strategy: {
                        //                     type: "string",
                        //                     default: "SPLIT_BY_HTML_HEADER",
                        //                 },
                        //                 config: {
                        //                     type: "object",
                        //                     properties: {
                        //                         headers_to_split_on: {
                        //                             type: "array",
                        //                             description:
                        //                                 "list of headers we want to track mapped to (arbitrary) keys for metadata. Allowed header values: h1, h2, h3, h4, h5, h6",
                        //                             default: ["h2", "h3"],
                        //                             items: [
                        //                                 {
                        //                                     type: "string",
                        //                                 },
                        //                             ],
                        //                         },
                        //                     },
                        //                 },
                        //             },
                        //         },
                        //         {
                        //             type: "object",
                        //             properties: {
                        //                 strategy: {
                        //                     type: "string",
                        //                     default: "SPLIT_BY_CHARACTER",
                        //                 },
                        //                 config: {
                        //                     type: "object",
                        //                     properties: {
                        //                         separator: {
                        //                             type: "string",
                        //                             default: "\\n\\n",
                        //                         },
                        //                     },
                        //                 },
                        //             },
                        //         },
                        //         {
                        //             type: "object",
                        //             properties: {
                        //                 strategy: {
                        //                     type: "string",
                        //                     default: "SPLIT_CODE",
                        //                 },
                        //                 config: {
                        //                     type: "object",
                        //                     properties: {
                        //                         separators: {
                        //                             type: "array",
                        //                             default: ["\\nclass ", "\\ndef "],
                        //                         },
                        //                     },
                        //                 },
                        //             },
                        //         },
                        //         {
                        //             type: "object",
                        //             properties: {
                        //                 strategy: {
                        //                     type: "string",
                        //                     default: "SPLIT_BY_MARKDOWN",
                        //                 },
                        //                 config: {
                        //                     type: "object",
                        //                     default: {},
                        //                 },
                        //             },
                        //         },
                        //         {
                        //             type: "object",
                        //             properties: {
                        //                 strategy: {
                        //                     type: "string",
                        //                     default: "SPLIT_JSON_RECURSIVELY",
                        //                 },
                        //                 config: {
                        //                     type: "object",
                        //                     default: {},
                        //                 },
                        //             },
                        //         },
                        //         {
                        //             type: "object",
                        //             properties: {
                        //                 strategy: {
                        //                     type: "string",
                        //                     default: "SPLIT_BY_CHARACTER_RECURSIVELY",
                        //                 },
                        //                 config: {
                        //                     type: "object",
                        //                     properties: {
                        //                         separators: {
                        //                             type: "array",
                        //                             default: ["\n\n", "\n", " ", ""],
                        //                         },
                        //                     },
                        //                 },
                        //             },
                        //         },
                        //         {
                        //             type: "object",
                        //             properties: {
                        //                 strategy: {
                        //                     type: "string",
                        //                     default: "SPLIT_BY_TOKENS",
                        //                 },
                        //                 config: {
                        //                     type: "object",
                        //                     properties: {
                        //                         separators: {
                        //                             type: "array",
                        //                             default: ["\n\n", "\n", " ", ""],
                        //                         },
                        //                     },
                        //                 },
                        //             },
                        //         },
                        //     ],
                        // },
                    },
                },
            },
        },
    },
};

export const getFormDataForSource = async (selectedActor: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/actors/${selectedActor}/spec`);
    const data = await response.json();
    return jsonData;
};

export const getActors = async (actorType: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/actors/${actorType}/list`);
    const data = await response.json();
    return data;
};

export const createActorInstance = async (data: any) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/actor_instances/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
};
