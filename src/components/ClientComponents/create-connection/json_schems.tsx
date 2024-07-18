const file = {
    $defs: {
        Advanced: {
            properties: {
                splitter_settings: {
                    default: null,
                    description: "Splitter settings.",
                    title: "Splitter Settings",
                    "ui-opts": {
                        widget: "singleDropdown",
                    },
                    oneOf: [
                        {
                            properties: {
                                splitter_settings: {
                                    default: "SPLIT_BY_HTML_HEADER",
                                    title: "Splitter Settings",
                                    type: "string",
                                    "ui-opts": {
                                        hidden: true,
                                    },
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
                                            type: "array",
                                            "ui-opts": {
                                                widget: "textboxDelimiterSeparatedChip",
                                            },
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
                                splitter_settings: {
                                    default: "SPLIT_BY_CHARACTER",
                                    title: "Splitter Settings",
                                    type: "string",
                                    "ui-opts": {
                                        hidden: true,
                                    },
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
                                splitter_settings: {
                                    default: "SPLIT_CODE",
                                    title: "Splitter Settings",
                                    type: "string",
                                    "ui-opts": {
                                        hidden: true,
                                    },
                                },
                                config: {
                                    properties: {
                                        separators: {
                                            default: ["\\nclass ", "\\ndef "],
                                            items: {},
                                            title: "Separators",
                                            type: "array",
                                            "ui-opts": {
                                                widget: "textboxDelimiterSeparatedChip",
                                            },
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
                                splitter_settings: {
                                    default: "SPLIT_BY_MARKDOWN",
                                    title: "Splitter Settings",
                                    type: "string",
                                    "ui-opts": {
                                        hidden: true,
                                    },
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
                                splitter_settings: {
                                    default: "SPLIT_JSON_RECURSIVELY",
                                    title: "Splitter Settings",
                                    type: "string",
                                    "ui-opts": {
                                        hidden: true,
                                    },
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
                                splitter_settings: {
                                    default: "SPLIT_BY_CHARACTER_RECURSIVELY",
                                    title: "Splitter Settings",
                                    type: "string",
                                    "ui-opts": {
                                        hidden: true,
                                    },
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
                                splitter_settings: {
                                    default: "SPLIT_BY_TOKENS",
                                    title: "Splitter Settings",
                                    type: "string",
                                    "ui-opts": {
                                        hidden: true,
                                    },
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
        },
        PostgresTable1: {
            additionalProperties: true,
            properties: {
                name: {
                    default: "public.users",
                    description: "The name of the document stream.",
                    title: "Name",
                    type: "string",
                    "ui-opts": {
                        hidden: true,
                    },
                },
                namespace: {
                    default: null,
                    description: "The namespace the data is associated with.",
                    title: "Namespace",
                    type: "string",
                },
                read_sync_mode: {
                    enum: ["FULL_REFRESH", "INCREMENTAL"],
                    title: "ReadSyncMode",
                    type: "string",
                },
                write_sync_mode: {
                    enum: ["APPEND", "UPSERT", "REPLACE"],
                    title: "WriteSyncMode",
                    type: "string",
                },
                cursor_field: {
                    default: null,
                    description:
                        "The path to the field used to determine if a record is new or modified.\nREQUIRED for INCREMENTAL sync mode.",
                    title: "Cursor Field",
                    type: "string",
                },
                advanced: {
                    properties: {
                        splitter_settings: {
                            default: null,
                            description: "Splitter settings.",
                            title: "Splitter Settings",
                            "ui-opts": {
                                widget: "singleDropdown",
                            },
                            oneOf: [
                                {
                                    properties: {
                                        splitter_settings: {
                                            default: "SPLIT_BY_HTML_HEADER",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                                    type: "array",
                                                    "ui-opts": {
                                                        widget: "textboxDelimiterSeparatedChip",
                                                    },
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
                                        splitter_settings: {
                                            default: "SPLIT_BY_CHARACTER",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                        splitter_settings: {
                                            default: "SPLIT_CODE",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
                                        },
                                        config: {
                                            properties: {
                                                separators: {
                                                    default: ["\\nclass ", "\\ndef "],
                                                    items: {},
                                                    title: "Separators",
                                                    type: "array",
                                                    "ui-opts": {
                                                        widget: "textboxDelimiterSeparatedChip",
                                                    },
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
                                        splitter_settings: {
                                            default: "SPLIT_BY_MARKDOWN",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                        splitter_settings: {
                                            default: "SPLIT_JSON_RECURSIVELY",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                        splitter_settings: {
                                            default: "SPLIT_BY_CHARACTER_RECURSIVELY",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                        splitter_settings: {
                                            default: "SPLIT_BY_TOKENS",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                },
                json_schema: {
                    default: {
                        "public.users": {
                            properties: {
                                id: {
                                    type: "string",
                                },
                                email: {
                                    type: "string",
                                },
                                created_at: {
                                    type: "string",
                                },
                                updated_at: {
                                    type: "string",
                                },
                                password_hash: {
                                    type: "string",
                                },
                            },
                            type: "object",
                        },
                    },
                    description: "The JSON schema for the document stream.",
                    title: "Json Schema",
                    type: "object",
                    "ui-opts": {
                        hidden: true,
                    },
                },
            },
            title: "PostgresTable1",
            type: "object",
        },
        PostgresTable2: {
            additionalProperties: true,
            properties: {
                name: {
                    default: "public.workspace_users",
                    description: "The name of the document stream.",
                    title: "Name",
                    type: "string",
                    "ui-opts": {
                        hidden: true,
                    },
                },
                namespace: {
                    default: null,
                    description: "The namespace the data is associated with.",
                    title: "Namespace",
                    type: "string",
                },
                read_sync_mode: {
                    enum: ["FULL_REFRESH", "INCREMENTAL"],
                    title: "ReadSyncMode",
                    type: "string",
                },
                write_sync_mode: {
                    enum: ["APPEND", "UPSERT", "REPLACE"],
                    title: "WriteSyncMode",
                    type: "string",
                },
                cursor_field: {
                    default: null,
                    description:
                        "The path to the field used to determine if a record is new or modified.\nREQUIRED for INCREMENTAL sync mode.",
                    title: "Cursor Field",
                    type: "string",
                },
                advanced: {
                    properties: {
                        splitter_settings: {
                            default: null,
                            description: "Splitter settings.",
                            title: "Splitter Settings",
                            "ui-opts": {
                                widget: "singleDropdown",
                            },
                            oneOf: [
                                {
                                    properties: {
                                        splitter_settings: {
                                            default: "SPLIT_BY_HTML_HEADER",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                                    type: "array",
                                                    "ui-opts": {
                                                        widget: "textboxDelimiterSeparatedChip",
                                                    },
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
                                        splitter_settings: {
                                            default: "SPLIT_BY_CHARACTER",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                        splitter_settings: {
                                            default: "SPLIT_CODE",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
                                        },
                                        config: {
                                            properties: {
                                                separators: {
                                                    default: ["\\nclass ", "\\ndef "],
                                                    items: {},
                                                    title: "Separators",
                                                    type: "array",
                                                    "ui-opts": {
                                                        widget: "textboxDelimiterSeparatedChip",
                                                    },
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
                                        splitter_settings: {
                                            default: "SPLIT_BY_MARKDOWN",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                        splitter_settings: {
                                            default: "SPLIT_JSON_RECURSIVELY",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                        splitter_settings: {
                                            default: "SPLIT_BY_CHARACTER_RECURSIVELY",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                        splitter_settings: {
                                            default: "SPLIT_BY_TOKENS",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                },
                json_schema: {
                    default: {
                        "public.workspace_users": {
                            properties: {
                                id: {
                                    type: "string",
                                },
                                workspace_id: {
                                    type: "string",
                                },
                                user_id: {
                                    type: "string",
                                },
                                created_at: {
                                    type: "string",
                                },
                                updated_at: {
                                    type: "string",
                                },
                            },
                            type: "object",
                        },
                    },
                    description: "The JSON schema for the document stream.",
                    title: "Json Schema",
                    type: "object",
                    "ui-opts": {
                        hidden: true,
                    },
                },
            },
            title: "PostgresTable2",
            type: "object",
        },
        PostgresTable3: {
            additionalProperties: true,
            properties: {
                name: {
                    default: "public.alembic_version",
                    description: "The name of the document stream.",
                    title: "Name",
                    type: "string",
                    "ui-opts": {
                        hidden: true,
                    },
                },
                namespace: {
                    default: null,
                    description: "The namespace the data is associated with.",
                    title: "Namespace",
                    type: "string",
                },
                read_sync_mode: {
                    enum: ["FULL_REFRESH", "INCREMENTAL"],
                    title: "ReadSyncMode",
                    type: "string",
                },
                write_sync_mode: {
                    enum: ["APPEND", "UPSERT", "REPLACE"],
                    title: "WriteSyncMode",
                    type: "string",
                },
                cursor_field: {
                    default: null,
                    description:
                        "The path to the field used to determine if a record is new or modified.\nREQUIRED for INCREMENTAL sync mode.",
                    title: "Cursor Field",
                    type: "string",
                },
                advanced: {
                    properties: {
                        splitter_settings: {
                            default: null,
                            description: "Splitter settings.",
                            title: "Splitter Settings",
                            "ui-opts": {
                                widget: "singleDropdown",
                            },
                            oneOf: [
                                {
                                    properties: {
                                        splitter_settings: {
                                            default: "SPLIT_BY_HTML_HEADER",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                                    type: "array",
                                                    "ui-opts": {
                                                        widget: "textboxDelimiterSeparatedChip",
                                                    },
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
                                        splitter_settings: {
                                            default: "SPLIT_BY_CHARACTER",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                        splitter_settings: {
                                            default: "SPLIT_CODE",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
                                        },
                                        config: {
                                            properties: {
                                                separators: {
                                                    default: ["\\nclass ", "\\ndef "],
                                                    items: {},
                                                    title: "Separators",
                                                    type: "array",
                                                    "ui-opts": {
                                                        widget: "textboxDelimiterSeparatedChip",
                                                    },
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
                                        splitter_settings: {
                                            default: "SPLIT_BY_MARKDOWN",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                        splitter_settings: {
                                            default: "SPLIT_JSON_RECURSIVELY",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                        splitter_settings: {
                                            default: "SPLIT_BY_CHARACTER_RECURSIVELY",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                        splitter_settings: {
                                            default: "SPLIT_BY_TOKENS",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                },
                json_schema: {
                    default: {
                        "public.alembic_version": {
                            properties: {
                                version_num: {
                                    type: "string",
                                },
                            },
                            type: "object",
                        },
                    },
                    description: "The JSON schema for the document stream.",
                    title: "Json Schema",
                    type: "object",
                    "ui-opts": {
                        hidden: true,
                    },
                },
            },
            title: "PostgresTable3",
            type: "object",
        },
        PostgresTable4: {
            additionalProperties: true,
            properties: {
                name: {
                    default: "public.workspaces",
                    description: "The name of the document stream.",
                    title: "Name",
                    type: "string",
                    "ui-opts": {
                        hidden: true,
                    },
                },
                namespace: {
                    default: null,
                    description: "The namespace the data is associated with.",
                    title: "Namespace",
                    type: "string",
                },
                read_sync_mode: {
                    enum: ["FULL_REFRESH", "INCREMENTAL"],
                    title: "ReadSyncMode",
                    type: "string",
                },
                write_sync_mode: {
                    enum: ["APPEND", "UPSERT", "REPLACE"],
                    title: "WriteSyncMode",
                    type: "string",
                },
                cursor_field: {
                    default: null,
                    description:
                        "The path to the field used to determine if a record is new or modified.\nREQUIRED for INCREMENTAL sync mode.",
                    title: "Cursor Field",
                    type: "string",
                },
                advanced: {
                    properties: {
                        splitter_settings: {
                            default: null,
                            description: "Splitter settings.",
                            title: "Splitter Settings",
                            "ui-opts": {
                                widget: "singleDropdown",
                            },
                            oneOf: [
                                {
                                    properties: {
                                        splitter_settings: {
                                            default: "SPLIT_BY_HTML_HEADER",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                                    type: "array",
                                                    "ui-opts": {
                                                        widget: "textboxDelimiterSeparatedChip",
                                                    },
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
                                        splitter_settings: {
                                            default: "SPLIT_BY_CHARACTER",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                        splitter_settings: {
                                            default: "SPLIT_CODE",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
                                        },
                                        config: {
                                            properties: {
                                                separators: {
                                                    default: ["\\nclass ", "\\ndef "],
                                                    items: {},
                                                    title: "Separators",
                                                    type: "array",
                                                    "ui-opts": {
                                                        widget: "textboxDelimiterSeparatedChip",
                                                    },
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
                                        splitter_settings: {
                                            default: "SPLIT_BY_MARKDOWN",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                        splitter_settings: {
                                            default: "SPLIT_JSON_RECURSIVELY",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                        splitter_settings: {
                                            default: "SPLIT_BY_CHARACTER_RECURSIVELY",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                        splitter_settings: {
                                            default: "SPLIT_BY_TOKENS",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                },
                json_schema: {
                    default: {
                        "public.workspaces": {
                            properties: {
                                id: {
                                    type: "string",
                                },
                                organization_id: {
                                    type: "string",
                                },
                                name: {
                                    type: "string",
                                },
                                status: {
                                    type: "string",
                                },
                                created_at: {
                                    type: "string",
                                },
                                updated_at: {
                                    type: "string",
                                },
                            },
                            type: "object",
                        },
                    },
                    description: "The JSON schema for the document stream.",
                    title: "Json Schema",
                    type: "object",
                    "ui-opts": {
                        hidden: true,
                    },
                },
            },
            title: "PostgresTable4",
            type: "object",
        },
        PostgresTable5: {
            additionalProperties: true,
            properties: {
                name: {
                    default: "public.actor_instances",
                    description: "The name of the document stream.",
                    title: "Name",
                    type: "string",
                    "ui-opts": {
                        hidden: true,
                    },
                },
                namespace: {
                    default: null,
                    description: "The namespace the data is associated with.",
                    title: "Namespace",
                    type: "string",
                },
                read_sync_mode: {
                    enum: ["FULL_REFRESH", "INCREMENTAL"],
                    title: "ReadSyncMode",
                    type: "string",
                },
                write_sync_mode: {
                    enum: ["APPEND", "UPSERT", "REPLACE"],
                    title: "WriteSyncMode",
                    type: "string",
                },
                cursor_field: {
                    default: null,
                    description:
                        "The path to the field used to determine if a record is new or modified.\nREQUIRED for INCREMENTAL sync mode.",
                    title: "Cursor Field",
                    type: "string",
                },
                advanced: {
                    properties: {
                        splitter_settings: {
                            default: null,
                            description: "Splitter settings.",
                            title: "Splitter Settings",
                            "ui-opts": {
                                widget: "singleDropdown",
                            },
                            oneOf: [
                                {
                                    properties: {
                                        splitter_settings: {
                                            default: "SPLIT_BY_HTML_HEADER",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                                    type: "array",
                                                    "ui-opts": {
                                                        widget: "textboxDelimiterSeparatedChip",
                                                    },
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
                                        splitter_settings: {
                                            default: "SPLIT_BY_CHARACTER",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                        splitter_settings: {
                                            default: "SPLIT_CODE",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
                                        },
                                        config: {
                                            properties: {
                                                separators: {
                                                    default: ["\\nclass ", "\\ndef "],
                                                    items: {},
                                                    title: "Separators",
                                                    type: "array",
                                                    "ui-opts": {
                                                        widget: "textboxDelimiterSeparatedChip",
                                                    },
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
                                        splitter_settings: {
                                            default: "SPLIT_BY_MARKDOWN",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                        splitter_settings: {
                                            default: "SPLIT_JSON_RECURSIVELY",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                        splitter_settings: {
                                            default: "SPLIT_BY_CHARACTER_RECURSIVELY",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                        splitter_settings: {
                                            default: "SPLIT_BY_TOKENS",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                },
                json_schema: {
                    default: {
                        "public.actor_instances": {
                            properties: {
                                id: {
                                    type: "string",
                                },
                                workspace_id: {
                                    type: "string",
                                },
                                actor_id: {
                                    type: "string",
                                },
                                user_id: {
                                    type: "string",
                                },
                                name: {
                                    type: "string",
                                },
                                configuration: {
                                    type: "object",
                                },
                                actor_type: {
                                    type: "string",
                                },
                                status: {
                                    type: "string",
                                },
                                created_at: {
                                    type: "string",
                                },
                                updated_at: {
                                    type: "string",
                                },
                            },
                            type: "object",
                        },
                    },
                    description: "The JSON schema for the document stream.",
                    title: "Json Schema",
                    type: "object",
                    "ui-opts": {
                        hidden: true,
                    },
                },
            },
            title: "PostgresTable5",
            type: "object",
        },
        PostgresTable6: {
            additionalProperties: true,
            properties: {
                name: {
                    default: "public.actors",
                    description: "The name of the document stream.",
                    title: "Name",
                    type: "string",
                    "ui-opts": {
                        hidden: true,
                    },
                },
                namespace: {
                    default: null,
                    description: "The namespace the data is associated with.",
                    title: "Namespace",
                    type: "string",
                },
                read_sync_mode: {
                    enum: ["FULL_REFRESH", "INCREMENTAL"],
                    title: "ReadSyncMode",
                    type: "string",
                },
                write_sync_mode: {
                    enum: ["APPEND", "UPSERT", "REPLACE"],
                    title: "WriteSyncMode",
                    type: "string",
                },
                cursor_field: {
                    default: null,
                    description:
                        "The path to the field used to determine if a record is new or modified.\nREQUIRED for INCREMENTAL sync mode.",
                    title: "Cursor Field",
                    type: "string",
                },
                advanced: {
                    properties: {
                        splitter_settings: {
                            default: null,
                            description: "Splitter settings.",
                            title: "Splitter Settings",
                            "ui-opts": {
                                widget: "singleDropdown",
                            },
                            oneOf: [
                                {
                                    properties: {
                                        splitter_settings: {
                                            default: "SPLIT_BY_HTML_HEADER",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                                    type: "array",
                                                    "ui-opts": {
                                                        widget: "textboxDelimiterSeparatedChip",
                                                    },
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
                                        splitter_settings: {
                                            default: "SPLIT_BY_CHARACTER",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                        splitter_settings: {
                                            default: "SPLIT_CODE",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
                                        },
                                        config: {
                                            properties: {
                                                separators: {
                                                    default: ["\\nclass ", "\\ndef "],
                                                    items: {},
                                                    title: "Separators",
                                                    type: "array",
                                                    "ui-opts": {
                                                        widget: "textboxDelimiterSeparatedChip",
                                                    },
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
                                        splitter_settings: {
                                            default: "SPLIT_BY_MARKDOWN",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                        splitter_settings: {
                                            default: "SPLIT_JSON_RECURSIVELY",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                        splitter_settings: {
                                            default: "SPLIT_BY_CHARACTER_RECURSIVELY",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                        splitter_settings: {
                                            default: "SPLIT_BY_TOKENS",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                },
                json_schema: {
                    default: {
                        "public.actors": {
                            properties: {
                                id: {
                                    type: "string",
                                },
                                name: {
                                    type: "string",
                                },
                                icon: {
                                    type: "string",
                                },
                                actor_type: {
                                    type: "string",
                                },
                                status: {
                                    type: "string",
                                },
                                created_at: {
                                    type: "string",
                                },
                                updated_at: {
                                    type: "string",
                                },
                                module_name: {
                                    type: "string",
                                },
                            },
                            type: "object",
                        },
                    },
                    description: "The JSON schema for the document stream.",
                    title: "Json Schema",
                    type: "object",
                    "ui-opts": {
                        hidden: true,
                    },
                },
            },
            title: "PostgresTable6",
            type: "object",
        },
        PostgresTable7: {
            additionalProperties: true,
            properties: {
                name: {
                    default: "public.connection_run_logs",
                    description: "The name of the document stream.",
                    title: "Name",
                    type: "string",
                    "ui-opts": {
                        hidden: true,
                    },
                },
                namespace: {
                    default: null,
                    description: "The namespace the data is associated with.",
                    title: "Namespace",
                    type: "string",
                },
                read_sync_mode: {
                    enum: ["FULL_REFRESH", "INCREMENTAL"],
                    title: "ReadSyncMode",
                    type: "string",
                },
                write_sync_mode: {
                    enum: ["APPEND", "UPSERT", "REPLACE"],
                    title: "WriteSyncMode",
                    type: "string",
                },
                cursor_field: {
                    default: null,
                    description:
                        "The path to the field used to determine if a record is new or modified.\nREQUIRED for INCREMENTAL sync mode.",
                    title: "Cursor Field",
                    type: "string",
                },
                advanced: {
                    properties: {
                        splitter_settings: {
                            default: null,
                            description: "Splitter settings.",
                            title: "Splitter Settings",
                            "ui-opts": {
                                widget: "singleDropdown",
                            },
                            oneOf: [
                                {
                                    properties: {
                                        splitter_settings: {
                                            default: "SPLIT_BY_HTML_HEADER",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                                    type: "array",
                                                    "ui-opts": {
                                                        widget: "textboxDelimiterSeparatedChip",
                                                    },
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
                                        splitter_settings: {
                                            default: "SPLIT_BY_CHARACTER",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                        splitter_settings: {
                                            default: "SPLIT_CODE",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
                                        },
                                        config: {
                                            properties: {
                                                separators: {
                                                    default: ["\\nclass ", "\\ndef "],
                                                    items: {},
                                                    title: "Separators",
                                                    type: "array",
                                                    "ui-opts": {
                                                        widget: "textboxDelimiterSeparatedChip",
                                                    },
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
                                        splitter_settings: {
                                            default: "SPLIT_BY_MARKDOWN",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                        splitter_settings: {
                                            default: "SPLIT_JSON_RECURSIVELY",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                        splitter_settings: {
                                            default: "SPLIT_BY_CHARACTER_RECURSIVELY",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                        splitter_settings: {
                                            default: "SPLIT_BY_TOKENS",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                },
                json_schema: {
                    default: {
                        "public.connection_run_logs": {
                            properties: {
                                id: {
                                    type: "string",
                                },
                                connection_id: {
                                    type: "string",
                                },
                                message: {
                                    type: "string",
                                },
                                stack_trace: {
                                    type: "string",
                                },
                                created_at: {
                                    type: "string",
                                },
                                updated_at: {
                                    type: "string",
                                },
                                run_id: {
                                    type: "string",
                                },
                                message_type: {
                                    type: "string",
                                },
                            },
                            type: "object",
                        },
                    },
                    description: "The JSON schema for the document stream.",
                    title: "Json Schema",
                    type: "object",
                    "ui-opts": {
                        hidden: true,
                    },
                },
            },
            title: "PostgresTable7",
            type: "object",
        },
        PostgresTable8: {
            additionalProperties: true,
            properties: {
                name: {
                    default: "public.connections",
                    description: "The name of the document stream.",
                    title: "Name",
                    type: "string",
                    "ui-opts": {
                        hidden: true,
                    },
                },
                namespace: {
                    default: null,
                    description: "The namespace the data is associated with.",
                    title: "Namespace",
                    type: "string",
                },
                read_sync_mode: {
                    enum: ["FULL_REFRESH", "INCREMENTAL"],
                    title: "ReadSyncMode",
                    type: "string",
                },
                write_sync_mode: {
                    enum: ["APPEND", "UPSERT", "REPLACE"],
                    title: "WriteSyncMode",
                    type: "string",
                },
                cursor_field: {
                    default: null,
                    description:
                        "The path to the field used to determine if a record is new or modified.\nREQUIRED for INCREMENTAL sync mode.",
                    title: "Cursor Field",
                    type: "string",
                },
                advanced: {
                    properties: {
                        splitter_settings: {
                            default: null,
                            description: "Splitter settings.",
                            title: "Splitter Settings",
                            "ui-opts": {
                                widget: "singleDropdown",
                            },
                            oneOf: [
                                {
                                    properties: {
                                        splitter_settings: {
                                            default: "SPLIT_BY_HTML_HEADER",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                                    type: "array",
                                                    "ui-opts": {
                                                        widget: "textboxDelimiterSeparatedChip",
                                                    },
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
                                        splitter_settings: {
                                            default: "SPLIT_BY_CHARACTER",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                        splitter_settings: {
                                            default: "SPLIT_CODE",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
                                        },
                                        config: {
                                            properties: {
                                                separators: {
                                                    default: ["\\nclass ", "\\ndef "],
                                                    items: {},
                                                    title: "Separators",
                                                    type: "array",
                                                    "ui-opts": {
                                                        widget: "textboxDelimiterSeparatedChip",
                                                    },
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
                                        splitter_settings: {
                                            default: "SPLIT_BY_MARKDOWN",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                        splitter_settings: {
                                            default: "SPLIT_JSON_RECURSIVELY",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                        splitter_settings: {
                                            default: "SPLIT_BY_CHARACTER_RECURSIVELY",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                        splitter_settings: {
                                            default: "SPLIT_BY_TOKENS",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                },
                json_schema: {
                    default: {
                        "public.connections": {
                            properties: {
                                id: {
                                    type: "string",
                                },
                                name: {
                                    type: "string",
                                },
                                source_instance_id: {
                                    type: "string",
                                },
                                generator_instance_id: {
                                    type: "string",
                                },
                                destination_instance_id: {
                                    type: "string",
                                },
                                configuration: {
                                    type: "object",
                                },
                                catalog: {
                                    type: "object",
                                },
                                status: {
                                    type: "string",
                                },
                                created_at: {
                                    type: "string",
                                },
                                updated_at: {
                                    type: "string",
                                },
                                workspace_id: {
                                    type: "string",
                                },
                                namespace_format: {
                                    type: "string",
                                },
                                prefix: {
                                    type: "string",
                                },
                                schedule: {
                                    type: "object",
                                },
                                schedule_type: {
                                    type: "string",
                                },
                            },
                            type: "object",
                        },
                    },
                    description: "The JSON schema for the document stream.",
                    title: "Json Schema",
                    type: "object",
                    "ui-opts": {
                        hidden: true,
                    },
                },
            },
            title: "PostgresTable8",
            type: "object",
        },
        PostgresTable9: {
            additionalProperties: true,
            properties: {
                name: {
                    default: "public.organizations",
                    description: "The name of the document stream.",
                    title: "Name",
                    type: "string",
                    "ui-opts": {
                        hidden: true,
                    },
                },
                namespace: {
                    default: null,
                    description: "The namespace the data is associated with.",
                    title: "Namespace",
                    type: "string",
                },
                read_sync_mode: {
                    enum: ["FULL_REFRESH", "INCREMENTAL"],
                    title: "ReadSyncMode",
                    type: "string",
                },
                write_sync_mode: {
                    enum: ["APPEND", "UPSERT", "REPLACE"],
                    title: "WriteSyncMode",
                    type: "string",
                },
                cursor_field: {
                    default: null,
                    description:
                        "The path to the field used to determine if a record is new or modified.\nREQUIRED for INCREMENTAL sync mode.",
                    title: "Cursor Field",
                    type: "string",
                },
                advanced: {
                    properties: {
                        splitter_settings: {
                            default: null,
                            description: "Splitter settings.",
                            title: "Splitter Settings",
                            "ui-opts": {
                                widget: "singleDropdown",
                            },
                            oneOf: [
                                {
                                    properties: {
                                        splitter_settings: {
                                            default: "SPLIT_BY_HTML_HEADER",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                                    type: "array",
                                                    "ui-opts": {
                                                        widget: "textboxDelimiterSeparatedChip",
                                                    },
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
                                        splitter_settings: {
                                            default: "SPLIT_BY_CHARACTER",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                        splitter_settings: {
                                            default: "SPLIT_CODE",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
                                        },
                                        config: {
                                            properties: {
                                                separators: {
                                                    default: ["\\nclass ", "\\ndef "],
                                                    items: {},
                                                    title: "Separators",
                                                    type: "array",
                                                    "ui-opts": {
                                                        widget: "textboxDelimiterSeparatedChip",
                                                    },
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
                                        splitter_settings: {
                                            default: "SPLIT_BY_MARKDOWN",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                        splitter_settings: {
                                            default: "SPLIT_JSON_RECURSIVELY",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                        splitter_settings: {
                                            default: "SPLIT_BY_CHARACTER_RECURSIVELY",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                                        splitter_settings: {
                                            default: "SPLIT_BY_TOKENS",
                                            title: "Splitter Settings",
                                            type: "string",
                                            "ui-opts": {
                                                hidden: true,
                                            },
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
                },
                json_schema: {
                    default: {
                        "public.organizations": {
                            properties: {
                                id: {
                                    type: "string",
                                },
                                name: {
                                    type: "string",
                                },
                                status: {
                                    type: "string",
                                },
                                created_at: {
                                    type: "string",
                                },
                                updated_at: {
                                    type: "string",
                                },
                            },
                            type: "object",
                        },
                    },
                    description: "The JSON schema for the document stream.",
                    title: "Json Schema",
                    type: "object",
                    "ui-opts": {
                        hidden: true,
                    },
                },
            },
            title: "PostgresTable9",
            type: "object",
        },
        ReadSyncMode: {
            enum: ["FULL_REFRESH", "INCREMENTAL"],
            title: "ReadSyncMode",
            type: "string",
        },
        SplitByCharacterExtraConfig: {
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
        SplitByCharacterRecursiverlyConfig: {
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
        SplitByCharacterRecursiverlySettings: {
            properties: {
                splitter_settings: {
                    default: "SPLIT_BY_CHARACTER_RECURSIVELY",
                    title: "Splitter Settings",
                    type: "string",
                    "ui-opts": {
                        hidden: true,
                    },
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
        SplitByCharacterSettings: {
            properties: {
                splitter_settings: {
                    default: "SPLIT_BY_CHARACTER",
                    title: "Splitter Settings",
                    type: "string",
                    "ui-opts": {
                        hidden: true,
                    },
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
        SplitByHtmlHeaderExtraConfig: {
            properties: {
                headers_to_split_on: {
                    default: ["h2", "h3"],
                    description:
                        "list of headers we want to track mapped to (arbitrary) keys for metadata. Allowed header values: h1, h2, h3, h4, h5, h6",
                    items: {
                        type: "string",
                    },
                    title: "Headers To Split On",
                    type: "array",
                    "ui-opts": {
                        widget: "textboxDelimiterSeparatedChip",
                    },
                },
            },
            title: "SplitByHtmlHeaderExtraConfig",
            type: "object",
        },
        SplitByHtmlHeaderSettings: {
            properties: {
                splitter_settings: {
                    default: "SPLIT_BY_HTML_HEADER",
                    title: "Splitter Settings",
                    type: "string",
                    "ui-opts": {
                        hidden: true,
                    },
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
                            type: "array",
                            "ui-opts": {
                                widget: "textboxDelimiterSeparatedChip",
                            },
                        },
                    },
                    title: "SplitByHtmlHeaderExtraConfig",
                    type: "object",
                },
            },
            title: "SplitByHtmlHeaderSettings",
            type: "object",
        },
        SplitByMarkdownSettings: {
            properties: {
                splitter_settings: {
                    default: "SPLIT_BY_MARKDOWN",
                    title: "Splitter Settings",
                    type: "string",
                    "ui-opts": {
                        hidden: true,
                    },
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
        SplitByTokensSettings: {
            properties: {
                splitter_settings: {
                    default: "SPLIT_BY_TOKENS",
                    title: "Splitter Settings",
                    type: "string",
                    "ui-opts": {
                        hidden: true,
                    },
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
        SplitCodeExtraConfig: {
            properties: {
                separators: {
                    default: ["\\nclass ", "\\ndef "],
                    items: {},
                    title: "Separators",
                    type: "array",
                    "ui-opts": {
                        widget: "textboxDelimiterSeparatedChip",
                    },
                },
            },
            title: "SplitCodeExtraConfig",
            type: "object",
        },
        SplitCodeSettings: {
            properties: {
                splitter_settings: {
                    default: "SPLIT_CODE",
                    title: "Splitter Settings",
                    type: "string",
                    "ui-opts": {
                        hidden: true,
                    },
                },
                config: {
                    properties: {
                        separators: {
                            default: ["\\nclass ", "\\ndef "],
                            items: {},
                            title: "Separators",
                            type: "array",
                            "ui-opts": {
                                widget: "textboxDelimiterSeparatedChip",
                            },
                        },
                    },
                    title: "SplitCodeExtraConfig",
                    type: "object",
                },
            },
            title: "SplitCodeSettings",
            type: "object",
        },
        SplitJsonRecursivelySettings: {
            properties: {
                splitter_settings: {
                    default: "SPLIT_JSON_RECURSIVELY",
                    title: "Splitter Settings",
                    type: "string",
                    "ui-opts": {
                        hidden: true,
                    },
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
        WriteSyncMode: {
            enum: ["APPEND", "UPSERT", "REPLACE"],
            title: "WriteSyncMode",
            type: "string",
        },
    },
    properties: {
        document_streams: {
            items: {
                anyOf: [
                    {
                        additionalProperties: true,
                        properties: {
                            name: {
                                default: "public.users",
                                description: "The name of the document stream.",
                                title: "Name",
                                type: "string",
                                "ui-opts": {
                                    hidden: true,
                                },
                            },
                            namespace: {
                                default: null,
                                description: "The namespace the data is associated with.",
                                title: "Namespace",
                                type: "string",
                            },
                            read_sync_mode: {
                                enum: ["FULL_REFRESH", "INCREMENTAL"],
                                title: "ReadSyncMode",
                                type: "string",
                            },
                            write_sync_mode: {
                                enum: ["APPEND", "UPSERT", "REPLACE"],
                                title: "WriteSyncMode",
                                type: "string",
                            },
                            cursor_field: {
                                default: null,
                                description:
                                    "The path to the field used to determine if a record is new or modified.\nREQUIRED for INCREMENTAL sync mode.",
                                title: "Cursor Field",
                                type: "string",
                            },
                            advanced: {
                                properties: {
                                    splitter_settings: {
                                        default: null,
                                        description: "Splitter settings.",
                                        title: "Splitter Settings",
                                        "ui-opts": {
                                            widget: "singleDropdown",
                                        },
                                        oneOf: [
                                            {
                                                properties: {
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_HTML_HEADER",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                                type: "array",
                                                                "ui-opts": {
                                                                    widget: "textboxDelimiterSeparatedChip",
                                                                },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_CHARACTER",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_CODE",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
                                                    },
                                                    config: {
                                                        properties: {
                                                            separators: {
                                                                default: ["\\nclass ", "\\ndef "],
                                                                items: {},
                                                                title: "Separators",
                                                                type: "array",
                                                                "ui-opts": {
                                                                    widget: "textboxDelimiterSeparatedChip",
                                                                },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_MARKDOWN",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_JSON_RECURSIVELY",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_CHARACTER_RECURSIVELY",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_TOKENS",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                            },
                            json_schema: {
                                default: {
                                    "public.users": {
                                        properties: {
                                            id: {
                                                type: "string",
                                            },
                                            email: {
                                                type: "string",
                                            },
                                            created_at: {
                                                type: "string",
                                            },
                                            updated_at: {
                                                type: "string",
                                            },
                                            password_hash: {
                                                type: "string",
                                            },
                                        },
                                        type: "object",
                                    },
                                },
                                description: "The JSON schema for the document stream.",
                                title: "Json Schema",
                                type: "object",
                                "ui-opts": {
                                    hidden: true,
                                },
                            },
                        },
                        title: "PostgresTable1",
                        type: "object",
                    },
                    {
                        additionalProperties: true,
                        properties: {
                            name: {
                                default: "public.workspace_users",
                                description: "The name of the document stream.",
                                title: "Name",
                                type: "string",
                                "ui-opts": {
                                    hidden: true,
                                },
                            },
                            namespace: {
                                default: null,
                                description: "The namespace the data is associated with.",
                                title: "Namespace",
                                type: "string",
                            },
                            read_sync_mode: {
                                enum: ["FULL_REFRESH", "INCREMENTAL"],
                                title: "ReadSyncMode",
                                type: "string",
                            },
                            write_sync_mode: {
                                enum: ["APPEND", "UPSERT", "REPLACE"],
                                title: "WriteSyncMode",
                                type: "string",
                            },
                            cursor_field: {
                                default: null,
                                description:
                                    "The path to the field used to determine if a record is new or modified.\nREQUIRED for INCREMENTAL sync mode.",
                                title: "Cursor Field",
                                type: "string",
                            },
                            advanced: {
                                properties: {
                                    splitter_settings: {
                                        default: null,
                                        description: "Splitter settings.",
                                        title: "Splitter Settings",
                                        "ui-opts": {
                                            widget: "singleDropdown",
                                        },
                                        oneOf: [
                                            {
                                                properties: {
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_HTML_HEADER",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                                type: "array",
                                                                "ui-opts": {
                                                                    widget: "textboxDelimiterSeparatedChip",
                                                                },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_CHARACTER",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_CODE",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
                                                    },
                                                    config: {
                                                        properties: {
                                                            separators: {
                                                                default: ["\\nclass ", "\\ndef "],
                                                                items: {},
                                                                title: "Separators",
                                                                type: "array",
                                                                "ui-opts": {
                                                                    widget: "textboxDelimiterSeparatedChip",
                                                                },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_MARKDOWN",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_JSON_RECURSIVELY",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_CHARACTER_RECURSIVELY",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_TOKENS",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                            },
                            json_schema: {
                                default: {
                                    "public.workspace_users": {
                                        properties: {
                                            id: {
                                                type: "string",
                                            },
                                            workspace_id: {
                                                type: "string",
                                            },
                                            user_id: {
                                                type: "string",
                                            },
                                            created_at: {
                                                type: "string",
                                            },
                                            updated_at: {
                                                type: "string",
                                            },
                                        },
                                        type: "object",
                                    },
                                },
                                description: "The JSON schema for the document stream.",
                                title: "Json Schema",
                                type: "object",
                                "ui-opts": {
                                    hidden: true,
                                },
                            },
                        },
                        title: "PostgresTable2",
                        type: "object",
                    },
                    {
                        additionalProperties: true,
                        properties: {
                            name: {
                                default: "public.alembic_version",
                                description: "The name of the document stream.",
                                title: "Name",
                                type: "string",
                                "ui-opts": {
                                    hidden: true,
                                },
                            },
                            namespace: {
                                default: null,
                                description: "The namespace the data is associated with.",
                                title: "Namespace",
                                type: "string",
                            },
                            read_sync_mode: {
                                enum: ["FULL_REFRESH", "INCREMENTAL"],
                                title: "ReadSyncMode",
                                type: "string",
                            },
                            write_sync_mode: {
                                enum: ["APPEND", "UPSERT", "REPLACE"],
                                title: "WriteSyncMode",
                                type: "string",
                            },
                            cursor_field: {
                                default: null,
                                description:
                                    "The path to the field used to determine if a record is new or modified.\nREQUIRED for INCREMENTAL sync mode.",
                                title: "Cursor Field",
                                type: "string",
                            },
                            advanced: {
                                properties: {
                                    splitter_settings: {
                                        default: null,
                                        description: "Splitter settings.",
                                        title: "Splitter Settings",
                                        "ui-opts": {
                                            widget: "singleDropdown",
                                        },
                                        oneOf: [
                                            {
                                                properties: {
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_HTML_HEADER",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                                type: "array",
                                                                "ui-opts": {
                                                                    widget: "textboxDelimiterSeparatedChip",
                                                                },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_CHARACTER",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_CODE",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
                                                    },
                                                    config: {
                                                        properties: {
                                                            separators: {
                                                                default: ["\\nclass ", "\\ndef "],
                                                                items: {},
                                                                title: "Separators",
                                                                type: "array",
                                                                "ui-opts": {
                                                                    widget: "textboxDelimiterSeparatedChip",
                                                                },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_MARKDOWN",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_JSON_RECURSIVELY",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_CHARACTER_RECURSIVELY",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_TOKENS",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                            },
                            json_schema: {
                                default: {
                                    "public.alembic_version": {
                                        properties: {
                                            version_num: {
                                                type: "string",
                                            },
                                        },
                                        type: "object",
                                    },
                                },
                                description: "The JSON schema for the document stream.",
                                title: "Json Schema",
                                type: "object",
                                "ui-opts": {
                                    hidden: true,
                                },
                            },
                        },
                        title: "PostgresTable3",
                        type: "object",
                    },
                    {
                        additionalProperties: true,
                        properties: {
                            name: {
                                default: "public.workspaces",
                                description: "The name of the document stream.",
                                title: "Name",
                                type: "string",
                                "ui-opts": {
                                    hidden: true,
                                },
                            },
                            namespace: {
                                default: null,
                                description: "The namespace the data is associated with.",
                                title: "Namespace",
                                type: "string",
                            },
                            read_sync_mode: {
                                enum: ["FULL_REFRESH", "INCREMENTAL"],
                                title: "ReadSyncMode",
                                type: "string",
                            },
                            write_sync_mode: {
                                enum: ["APPEND", "UPSERT", "REPLACE"],
                                title: "WriteSyncMode",
                                type: "string",
                            },
                            cursor_field: {
                                default: null,
                                description:
                                    "The path to the field used to determine if a record is new or modified.\nREQUIRED for INCREMENTAL sync mode.",
                                title: "Cursor Field",
                                type: "string",
                            },
                            advanced: {
                                properties: {
                                    splitter_settings: {
                                        default: null,
                                        description: "Splitter settings.",
                                        title: "Splitter Settings",
                                        "ui-opts": {
                                            widget: "singleDropdown",
                                        },
                                        oneOf: [
                                            {
                                                properties: {
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_HTML_HEADER",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                                type: "array",
                                                                "ui-opts": {
                                                                    widget: "textboxDelimiterSeparatedChip",
                                                                },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_CHARACTER",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_CODE",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
                                                    },
                                                    config: {
                                                        properties: {
                                                            separators: {
                                                                default: ["\\nclass ", "\\ndef "],
                                                                items: {},
                                                                title: "Separators",
                                                                type: "array",
                                                                "ui-opts": {
                                                                    widget: "textboxDelimiterSeparatedChip",
                                                                },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_MARKDOWN",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_JSON_RECURSIVELY",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_CHARACTER_RECURSIVELY",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_TOKENS",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                            },
                            json_schema: {
                                default: {
                                    "public.workspaces": {
                                        properties: {
                                            id: {
                                                type: "string",
                                            },
                                            organization_id: {
                                                type: "string",
                                            },
                                            name: {
                                                type: "string",
                                            },
                                            status: {
                                                type: "string",
                                            },
                                            created_at: {
                                                type: "string",
                                            },
                                            updated_at: {
                                                type: "string",
                                            },
                                        },
                                        type: "object",
                                    },
                                },
                                description: "The JSON schema for the document stream.",
                                title: "Json Schema",
                                type: "object",
                                "ui-opts": {
                                    hidden: true,
                                },
                            },
                        },
                        title: "PostgresTable4",
                        type: "object",
                    },
                    {
                        additionalProperties: true,
                        properties: {
                            name: {
                                default: "public.actor_instances",
                                description: "The name of the document stream.",
                                title: "Name",
                                type: "string",
                                "ui-opts": {
                                    hidden: true,
                                },
                            },
                            namespace: {
                                default: null,
                                description: "The namespace the data is associated with.",
                                title: "Namespace",
                                type: "string",
                            },
                            read_sync_mode: {
                                enum: ["FULL_REFRESH", "INCREMENTAL"],
                                title: "ReadSyncMode",
                                type: "string",
                            },
                            write_sync_mode: {
                                enum: ["APPEND", "UPSERT", "REPLACE"],
                                title: "WriteSyncMode",
                                type: "string",
                            },
                            cursor_field: {
                                default: null,
                                description:
                                    "The path to the field used to determine if a record is new or modified.\nREQUIRED for INCREMENTAL sync mode.",
                                title: "Cursor Field",
                                type: "string",
                            },
                            advanced: {
                                properties: {
                                    splitter_settings: {
                                        default: null,
                                        description: "Splitter settings.",
                                        title: "Splitter Settings",
                                        "ui-opts": {
                                            widget: "singleDropdown",
                                        },
                                        oneOf: [
                                            {
                                                properties: {
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_HTML_HEADER",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                                type: "array",
                                                                "ui-opts": {
                                                                    widget: "textboxDelimiterSeparatedChip",
                                                                },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_CHARACTER",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_CODE",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
                                                    },
                                                    config: {
                                                        properties: {
                                                            separators: {
                                                                default: ["\\nclass ", "\\ndef "],
                                                                items: {},
                                                                title: "Separators",
                                                                type: "array",
                                                                "ui-opts": {
                                                                    widget: "textboxDelimiterSeparatedChip",
                                                                },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_MARKDOWN",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_JSON_RECURSIVELY",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_CHARACTER_RECURSIVELY",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_TOKENS",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                            },
                            json_schema: {
                                default: {
                                    "public.actor_instances": {
                                        properties: {
                                            id: {
                                                type: "string",
                                            },
                                            workspace_id: {
                                                type: "string",
                                            },
                                            actor_id: {
                                                type: "string",
                                            },
                                            user_id: {
                                                type: "string",
                                            },
                                            name: {
                                                type: "string",
                                            },
                                            configuration: {
                                                type: "object",
                                            },
                                            actor_type: {
                                                type: "string",
                                            },
                                            status: {
                                                type: "string",
                                            },
                                            created_at: {
                                                type: "string",
                                            },
                                            updated_at: {
                                                type: "string",
                                            },
                                        },
                                        type: "object",
                                    },
                                },
                                description: "The JSON schema for the document stream.",
                                title: "Json Schema",
                                type: "object",
                                "ui-opts": {
                                    hidden: true,
                                },
                            },
                        },
                        title: "PostgresTable5",
                        type: "object",
                    },
                    {
                        additionalProperties: true,
                        properties: {
                            name: {
                                default: "public.actors",
                                description: "The name of the document stream.",
                                title: "Name",
                                type: "string",
                                "ui-opts": {
                                    hidden: true,
                                },
                            },
                            namespace: {
                                default: null,
                                description: "The namespace the data is associated with.",
                                title: "Namespace",
                                type: "string",
                            },
                            read_sync_mode: {
                                enum: ["FULL_REFRESH", "INCREMENTAL"],
                                title: "ReadSyncMode",
                                type: "string",
                            },
                            write_sync_mode: {
                                enum: ["APPEND", "UPSERT", "REPLACE"],
                                title: "WriteSyncMode",
                                type: "string",
                            },
                            cursor_field: {
                                default: null,
                                description:
                                    "The path to the field used to determine if a record is new or modified.\nREQUIRED for INCREMENTAL sync mode.",
                                title: "Cursor Field",
                                type: "string",
                            },
                            advanced: {
                                properties: {
                                    splitter_settings: {
                                        default: null,
                                        description: "Splitter settings.",
                                        title: "Splitter Settings",
                                        "ui-opts": {
                                            widget: "singleDropdown",
                                        },
                                        oneOf: [
                                            {
                                                properties: {
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_HTML_HEADER",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                                type: "array",
                                                                "ui-opts": {
                                                                    widget: "textboxDelimiterSeparatedChip",
                                                                },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_CHARACTER",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_CODE",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
                                                    },
                                                    config: {
                                                        properties: {
                                                            separators: {
                                                                default: ["\\nclass ", "\\ndef "],
                                                                items: {},
                                                                title: "Separators",
                                                                type: "array",
                                                                "ui-opts": {
                                                                    widget: "textboxDelimiterSeparatedChip",
                                                                },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_MARKDOWN",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_JSON_RECURSIVELY",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_CHARACTER_RECURSIVELY",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_TOKENS",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                            },
                            json_schema: {
                                default: {
                                    "public.actors": {
                                        properties: {
                                            id: {
                                                type: "string",
                                            },
                                            name: {
                                                type: "string",
                                            },
                                            icon: {
                                                type: "string",
                                            },
                                            actor_type: {
                                                type: "string",
                                            },
                                            status: {
                                                type: "string",
                                            },
                                            created_at: {
                                                type: "string",
                                            },
                                            updated_at: {
                                                type: "string",
                                            },
                                            module_name: {
                                                type: "string",
                                            },
                                        },
                                        type: "object",
                                    },
                                },
                                description: "The JSON schema for the document stream.",
                                title: "Json Schema",
                                type: "object",
                                "ui-opts": {
                                    hidden: true,
                                },
                            },
                        },
                        title: "PostgresTable6",
                        type: "object",
                    },
                    {
                        additionalProperties: true,
                        properties: {
                            name: {
                                default: "public.connection_run_logs",
                                description: "The name of the document stream.",
                                title: "Name",
                                type: "string",
                                "ui-opts": {
                                    hidden: true,
                                },
                            },
                            namespace: {
                                default: null,
                                description: "The namespace the data is associated with.",
                                title: "Namespace",
                                type: "string",
                            },
                            read_sync_mode: {
                                enum: ["FULL_REFRESH", "INCREMENTAL"],
                                title: "ReadSyncMode",
                                type: "string",
                            },
                            write_sync_mode: {
                                enum: ["APPEND", "UPSERT", "REPLACE"],
                                title: "WriteSyncMode",
                                type: "string",
                            },
                            cursor_field: {
                                default: null,
                                description:
                                    "The path to the field used to determine if a record is new or modified.\nREQUIRED for INCREMENTAL sync mode.",
                                title: "Cursor Field",
                                type: "string",
                            },
                            advanced: {
                                properties: {
                                    splitter_settings: {
                                        default: null,
                                        description: "Splitter settings.",
                                        title: "Splitter Settings",
                                        "ui-opts": {
                                            widget: "singleDropdown",
                                        },
                                        oneOf: [
                                            {
                                                properties: {
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_HTML_HEADER",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                                type: "array",
                                                                "ui-opts": {
                                                                    widget: "textboxDelimiterSeparatedChip",
                                                                },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_CHARACTER",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_CODE",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
                                                    },
                                                    config: {
                                                        properties: {
                                                            separators: {
                                                                default: ["\\nclass ", "\\ndef "],
                                                                items: {},
                                                                title: "Separators",
                                                                type: "array",
                                                                "ui-opts": {
                                                                    widget: "textboxDelimiterSeparatedChip",
                                                                },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_MARKDOWN",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_JSON_RECURSIVELY",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_CHARACTER_RECURSIVELY",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_TOKENS",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                            },
                            json_schema: {
                                default: {
                                    "public.connection_run_logs": {
                                        properties: {
                                            id: {
                                                type: "string",
                                            },
                                            connection_id: {
                                                type: "string",
                                            },
                                            message: {
                                                type: "string",
                                            },
                                            stack_trace: {
                                                type: "string",
                                            },
                                            created_at: {
                                                type: "string",
                                            },
                                            updated_at: {
                                                type: "string",
                                            },
                                            run_id: {
                                                type: "string",
                                            },
                                            message_type: {
                                                type: "string",
                                            },
                                        },
                                        type: "object",
                                    },
                                },
                                description: "The JSON schema for the document stream.",
                                title: "Json Schema",
                                type: "object",
                                "ui-opts": {
                                    hidden: true,
                                },
                            },
                        },
                        title: "PostgresTable7",
                        type: "object",
                    },
                    {
                        additionalProperties: true,
                        properties: {
                            name: {
                                default: "public.connections",
                                description: "The name of the document stream.",
                                title: "Name",
                                type: "string",
                                "ui-opts": {
                                    hidden: true,
                                },
                            },
                            namespace: {
                                default: null,
                                description: "The namespace the data is associated with.",
                                title: "Namespace",
                                type: "string",
                            },
                            read_sync_mode: {
                                enum: ["FULL_REFRESH", "INCREMENTAL"],
                                title: "ReadSyncMode",
                                type: "string",
                            },
                            write_sync_mode: {
                                enum: ["APPEND", "UPSERT", "REPLACE"],
                                title: "WriteSyncMode",
                                type: "string",
                            },
                            cursor_field: {
                                default: null,
                                description:
                                    "The path to the field used to determine if a record is new or modified.\nREQUIRED for INCREMENTAL sync mode.",
                                title: "Cursor Field",
                                type: "string",
                            },
                            advanced: {
                                properties: {
                                    splitter_settings: {
                                        default: null,
                                        description: "Splitter settings.",
                                        title: "Splitter Settings",
                                        "ui-opts": {
                                            widget: "singleDropdown",
                                        },
                                        oneOf: [
                                            {
                                                properties: {
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_HTML_HEADER",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                                type: "array",
                                                                "ui-opts": {
                                                                    widget: "textboxDelimiterSeparatedChip",
                                                                },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_CHARACTER",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_CODE",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
                                                    },
                                                    config: {
                                                        properties: {
                                                            separators: {
                                                                default: ["\\nclass ", "\\ndef "],
                                                                items: {},
                                                                title: "Separators",
                                                                type: "array",
                                                                "ui-opts": {
                                                                    widget: "textboxDelimiterSeparatedChip",
                                                                },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_MARKDOWN",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_JSON_RECURSIVELY",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_CHARACTER_RECURSIVELY",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_TOKENS",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                            },
                            json_schema: {
                                default: {
                                    "public.connections": {
                                        properties: {
                                            id: {
                                                type: "string",
                                            },
                                            name: {
                                                type: "string",
                                            },
                                            source_instance_id: {
                                                type: "string",
                                            },
                                            generator_instance_id: {
                                                type: "string",
                                            },
                                            destination_instance_id: {
                                                type: "string",
                                            },
                                            configuration: {
                                                type: "object",
                                            },
                                            catalog: {
                                                type: "object",
                                            },
                                            status: {
                                                type: "string",
                                            },
                                            created_at: {
                                                type: "string",
                                            },
                                            updated_at: {
                                                type: "string",
                                            },
                                            workspace_id: {
                                                type: "string",
                                            },
                                            namespace_format: {
                                                type: "string",
                                            },
                                            prefix: {
                                                type: "string",
                                            },
                                            schedule: {
                                                type: "object",
                                            },
                                            schedule_type: {
                                                type: "string",
                                            },
                                        },
                                        type: "object",
                                    },
                                },
                                description: "The JSON schema for the document stream.",
                                title: "Json Schema",
                                type: "object",
                                "ui-opts": {
                                    hidden: true,
                                },
                            },
                        },
                        title: "PostgresTable8",
                        type: "object",
                    },
                    {
                        additionalProperties: true,
                        properties: {
                            name: {
                                default: "public.organizations",
                                description: "The name of the document stream.",
                                title: "Name",
                                type: "string",
                                "ui-opts": {
                                    hidden: true,
                                },
                            },
                            namespace: {
                                default: null,
                                description: "The namespace the data is associated with.",
                                title: "Namespace",
                                type: "string",
                            },
                            read_sync_mode: {
                                enum: ["FULL_REFRESH", "INCREMENTAL"],
                                title: "ReadSyncMode",
                                type: "string",
                            },
                            write_sync_mode: {
                                enum: ["APPEND", "UPSERT", "REPLACE"],
                                title: "WriteSyncMode",
                                type: "string",
                            },
                            cursor_field: {
                                default: null,
                                description:
                                    "The path to the field used to determine if a record is new or modified.\nREQUIRED for INCREMENTAL sync mode.",
                                title: "Cursor Field",
                                type: "string",
                            },
                            advanced: {
                                properties: {
                                    splitter_settings: {
                                        default: null,
                                        description: "Splitter settings.",
                                        title: "Splitter Settings",
                                        "ui-opts": {
                                            widget: "singleDropdown",
                                        },
                                        oneOf: [
                                            {
                                                properties: {
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_HTML_HEADER",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                                type: "array",
                                                                "ui-opts": {
                                                                    widget: "textboxDelimiterSeparatedChip",
                                                                },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_CHARACTER",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_CODE",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
                                                    },
                                                    config: {
                                                        properties: {
                                                            separators: {
                                                                default: ["\\nclass ", "\\ndef "],
                                                                items: {},
                                                                title: "Separators",
                                                                type: "array",
                                                                "ui-opts": {
                                                                    widget: "textboxDelimiterSeparatedChip",
                                                                },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_MARKDOWN",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_JSON_RECURSIVELY",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_CHARACTER_RECURSIVELY",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                                                    splitter_settings: {
                                                        default: "SPLIT_BY_TOKENS",
                                                        title: "Splitter Settings",
                                                        type: "string",
                                                        "ui-opts": {
                                                            hidden: true,
                                                        },
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
                            },
                            json_schema: {
                                default: {
                                    "public.organizations": {
                                        properties: {
                                            id: {
                                                type: "string",
                                            },
                                            name: {
                                                type: "string",
                                            },
                                            status: {
                                                type: "string",
                                            },
                                            created_at: {
                                                type: "string",
                                            },
                                            updated_at: {
                                                type: "string",
                                            },
                                        },
                                        type: "object",
                                    },
                                },
                                description: "The JSON schema for the document stream.",
                                title: "Json Schema",
                                type: "object",
                                "ui-opts": {
                                    hidden: true,
                                },
                            },
                        },
                        title: "PostgresTable9",
                        type: "object",
                    },
                ],
            },
            title: "Document Streams",
            type: "array",
        },
    },
    required: ["document_streams"],
    title: "PostgresCatalog",
    type: "object",
};


export default file ;