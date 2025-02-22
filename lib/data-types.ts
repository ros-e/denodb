import type { ModelSchema } from "./model.ts";
import { Bson } from "../deps.ts";

type ObjectId = Bson.ObjectId;

export type FieldTypeString =
  | "bigInteger"
  | "integer"
  | "decimal"
  | "float"
  | "uuid"
  | "boolean"
  | "binary"
  | "enu"
  | "string"
  | "text"
  | "date"
  | "datetime"
  | "time"
  | "timestamp"
  | "json"
  | "jsonb";

export type FieldTypes =
  | "BIG_INTEGER"
  | "INTEGER"
  | "DECIMAL"
  | "FLOAT"
  | "UUID"
  | "BOOLEAN"
  | "BINARY"
  | "ENUM"
  | "STRING"
  | "TEXT"
  | "DATE"
  | "DATETIME"
  | "TIME"
  | "TIMESTAMP"
  | "JSON"
  | "ARRAY"
  | "JSONB";

export type Fields = {
  [key in FieldTypes]: FieldTypeString;
} & {
  decimal: (precision: number, scale?: number) => { type: FieldTypeString; precision: number; scale?: number };
  string: (length: number) => { type: FieldTypeString; length: number };
  enum: (values: (number | string)[]) => { type: FieldTypeString; values: (number | string)[] };
  integer: (length: number) => { type: FieldTypeString; length: number };
  array: (itemType: FieldTypeString) => { type: FieldTypeString; items: FieldTypeString };
};

export type FieldProps = {
  type?: FieldTypeString;
  as?: string;
  primaryKey?: boolean;
  unique?: boolean;
  autoIncrement?: boolean;
  length?: number;
  allowNull?: boolean;
  precision?: number;
  scale?: number;
  values?: (number | string)[];
  items?: FieldTypeString | FieldProps;
  relationship?: Relationship;
  comment?: string;
};

export type FieldType = FieldTypeString | FieldProps | FieldProps[];

export type FieldAlias = { [k: string]: string };
export type FieldValue = number | string | boolean | Date | ObjectId | null | (string[] | number[] | boolean[] | Date[] | ObjectId[]); //I think this fixes the array issue
export type FieldOptions = { name: string; type: FieldType; defaultValue: FieldValue | (() => FieldValue) };
export type Values = { [key: string]: FieldValue };

export type Relationship = { kind: "single" | "multiple"; model: ModelSchema };
export type RelationshipType = { type: FieldTypeString; relationship: Relationship };

export const DATA_TYPES: Fields = {
  INTEGER: "integer",
  BIG_INTEGER: "bigInteger",
  DECIMAL: "decimal",
  FLOAT: "float",
  UUID: "uuid",
  BOOLEAN: "boolean",
  BINARY: "binary",
  ENUM: "enu",
  STRING: "string",
  TEXT: "text",
  DATE: "date",
  DATETIME: "datetime",
  TIME: "time",
  TIMESTAMP: "timestamp",
  JSON: "json",
  ARRAY: "array",
  JSONB: "jsonb",

  decimal(precision: number, scale?: number) {
    return { type: this.DECIMAL, precision, scale };
  },

  string(length: number) {
    return { type: this.STRING, length };
  },

  enum(values: (number | string)[]) {
    return { type: this.ENUM, values };
  },

  integer(length: number) {
    return { type: this.INTEGER, length };
  },

  array(itemType: FieldTypeString) {
    return { type: this.ARRAY, items: itemType };
  },
};

export const DataTypes = DATA_TYPES;
