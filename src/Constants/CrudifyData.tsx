export interface CRUDIFY_DATA {
    Models: Array<CRUDIFY_MODEL>;
    Enums?: Array<string>;
    Authentication?: {
        model: string;
        userFieldName: string;
        passwordFieldName: string;
    };
}

export interface CRUDIFY_MODEL {
    name: string;
    attributes: {
        StaticFields: Array<CRUDIFY_STATIC_ATTRIBUTE>;
        RelationalFields: Array<CRUDIFY_RELATIONAL_ATTRIBUTE>;
    };
}

export interface CRUDIFY_STATIC_ATTRIBUTE {
    name: string;
    type: string;
    isUnique?: boolean;
    faker?: {
        module: string;
        method: string;
    };
}
export interface CRUDIFY_RELATIONAL_ATTRIBUTE {
    connection: string;
    foriegnKeyName: string;
    type: string;
}
