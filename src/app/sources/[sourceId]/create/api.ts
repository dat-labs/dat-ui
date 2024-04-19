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
            hostname: {
                description: "The host name of the database.",
                title: "HostName",
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
                ],
            },
        },
    },
};
