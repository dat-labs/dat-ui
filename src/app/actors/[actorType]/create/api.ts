const jsonData = {
    documentationUrl: "https://docs.airbyte.com/integrations/sources/mysql",
    connectionSpecification: {
        $schema: "http://json-schema.org/draft-07/schema#",
        title: "MySql Source Spec",
        type: "object",
        required: ["host", "port", "database", "username", "replication_method"],
        properties: {
            host: {
                description: "The host name of the database.",
                title: "Host",
                type: "string",
                order: 0,
            },
            port: {
                description: "The port to connect to.",
                title: "Port",
                type: "integer",
                minimum: 0,
                maximum: 65536,
                default: 3306,
                examples: ["3306"],
                order: 1,
            },
            database: {
                description: "The database name.",
                title: "Database",
                type: "string",
                order: 2,
            },
            username: {
                description: "The username which is used to access the database.",
                title: "Username",
                type: "string",
                order: 3,
            },
            password: {
                description: "The password associated with the username.",
                title: "Password",
                type: "string",
                airbyte_secret: true,
                order: 4,
                always_show: true,
            },
            jdbc_url_params: {
                description:
                    "Additional properties to pass to the JDBC URL string when connecting to the database formatted as 'key=value' pairs separated by the symbol '&'. (example: key1=value1&key2=value2&key3=value3). For more information read about <a href=\"https://dev.mysql.com/doc/connector-j/8.0/en/connector-j-reference-jdbc-url-format.html\">JDBC URL parameters</a>.",
                title: "JDBC URL Parameters (Advanced)",
                type: "string",
                order: 5,
            },
            ssl: {
                title: "SSL Connection",
                description: "Encrypt data using SSL.",
                type: "boolean",
                default: true,
                order: 6,
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
            replication_method: {
                type: "object",
                title: "Update Method",
                description: "Configures how data is extracted from the database.",
                order: 8,
                default: "CDC",
                display_type: "radio",
                oneOf: [
                    {
                        title: "Read Changes using Binary Log (CDC)",
                        description:
                            '<i>Recommended</i> - Incrementally reads new inserts, updates, and deletes using the MySQL <a href="https://docs.airbyte.com/integrations/sources/mysql/#change-data-capture-cdc">binary log</a>. This must be enabled on your database.',
                        required: ["method"],
                        properties: {
                            method: {
                                type: "string",
                                const: "CDC",
                                order: 0,
                            },
                            initial_waiting_seconds: {
                                type: "integer",
                                title: "Initial Waiting Time in Seconds (Advanced)",
                                description:
                                    'The amount of time the connector will wait when it launches to determine if there is new data to sync or not. Defaults to 300 seconds. Valid range: 120 seconds to 1200 seconds. Read about <a href="https://docs.airbyte.com/integrations/sources/mysql/#change-data-capture-cdc">initial waiting time</a>.',
                                default: 300,
                                min: 120,
                                max: 1200,
                                order: 1,
                                always_show: true,
                            },
                            server_time_zone: {
                                type: "string",
                                title: "Configured server timezone for the MySQL source (Advanced)",
                                description:
                                    "Enter the configured MySQL server timezone. This should only be done if the configured timezone in your MySQL instance does not conform to IANNA standard.",
                                order: 2,
                                always_show: true,
                            },
                            invalid_cdc_cursor_position_behavior: {
                                type: "string",
                                title: "Invalid CDC position behavior (Advanced)",
                                description:
                                    "Determines whether Airbyte should fail or re-sync data in case of an stale/invalid cursor value into the WAL. If 'Fail sync' is chosen, a user will have to manually reset the connection before being able to continue syncing data. If 'Re-sync data' is chosen, Airbyte will automatically trigger a refresh but could lead to higher cloud costs and data loss.",
                                enum: ["Fail sync", "Re-sync data"],
                                default: "Fail sync",
                                order: 3,
                                always_show: true,
                            },
                        },
                    },
                    {
                        title: "Scan Changes with User Defined Cursor",
                        description:
                            'Incrementally detects new inserts and updates using the <a href="https://docs.airbyte.com/understanding-airbyte/connections/incremental-append/#user-defined-cursor">cursor column</a> chosen when configuring a connection (e.g. created_at, updated_at).',
                        required: ["method"],
                        properties: {
                            method: {
                                type: "string",
                                const: "STANDARD",
                                order: 0,
                            },
                        },
                    },
                ],
            },
        },
    },
};

export const getFormDataForSource = async (selectedActor: string) => {
    const response = await fetch(`http://localhost:8000/actors/${selectedActor}/specs`);
    const data = await response.json();
    return data;
};

export const getActors = async (actorType: string) => {
    const response = await fetch(`http://localhost:8000/actors/${actorType}/list`);
    const data = await response.json();
    return data;
};

export const createActorInstance = async (data: any) => {
    const response = await fetch(`http://localhost:8000/actor_instances/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
};
