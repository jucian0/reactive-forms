import { UseFormGroup, GroupExtend } from "./indes.types"


export const useFormGroup = <T extends GroupExtend<T>>(formControls: T): UseFormGroup<T> => {

   const errors: UseFormGroup<T>['errors'] = Object.keys(formControls).reduce((objectErrors, key) => {
      return Object.assign(objectErrors, { [key]: (formControls as any)[key].error })
   }, {} as any)

   const values$: UseFormGroup<T>['values$'] = Object.keys(formControls).reduce((objectValues$, key) => {
      return Object.assign(objectValues$, { [key]: (formControls as any)[key].value$ })
   }, {} as any)

   const props: UseFormGroup<T>['props'] = Object.keys(formControls).reduce((objectProps, key) => {
      return Object.assign(objectProps, { [key]: (formControls as any)[key].props })
   }, {} as any)

   const values: UseFormGroup<T>['values'] = Object.keys(formControls).reduce((objectValues, key) => {
      return Object.assign(objectValues, { [key]: (formControls as any)[key].value })
   }, {} as any)


   return {
      values$,
      values,
      errors,
      props
   }
}
