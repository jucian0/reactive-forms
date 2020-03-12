export type MessageError = string

export type ValueValidator = any

export interface ValidatorFn { (value: ValueValidator): MessageError | null }
