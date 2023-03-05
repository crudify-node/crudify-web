export interface CRUDIFY_DATA {
  Models: CRUDIFY_MODEL[];
  Enums?: string[];
  Authentication?: {
    model: string;
    userFieldName: string;
    passwordFieldName: string;
  };
}

export interface CRUDIFY_MODEL {
  name: string;
  attributes: {
    StaticFields: CRUDIFY_STATIC_ATTRIBUTE[];
    RelationalFields: CRUDIFY_RELATIONAL_ATTRIBUTE[];
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
