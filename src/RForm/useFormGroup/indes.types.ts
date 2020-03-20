import { UseFormControlReturn } from "../useFormControl/index.types"

export type GroupExtend<T> = { [k in keyof T]: UseFormControlReturn<any> }

export type Values<T extends GroupExtend<T>> = { [k in keyof T]: T[k]['value'] }
export type Values$<T extends GroupExtend<T>> = { [k in keyof T]: T[k]['value'] }
export type Errors<T extends GroupExtend<T>> = { [k in keyof T]: T[k]['error'] }
export type Props<T extends GroupExtend<T>> = { [k in keyof T]: T[k]['props'] }


export interface UseFormGroup<T extends GroupExtend<T>> {
   values$: Values$<T>
   values: Values<T>
   errors: Errors<T>
   props: Props<T>
}