import React from 'react'
import { FormState } from '../StateManagement/FormState'
import { Validate } from '../Validation/Validate'
import { Validator } from '../Validation/Validators'

export type FieldType =
   | 'text'
   | 'number'
   | 'email'
   | 'password'
   | 'date'
   | 'time'
   | 'datetime-local'
   | 'month'
   | 'week'
   | 'url'
   | 'search'
   | 'tel'
   | 'color'
   | 'file'
   | 'range'
   | 'checkbox'
   | 'radio'
   | 'select'
   | 'textarea'
   | 'hidden'
   | 'submit'
   | 'reset'
   | 'custom'
   | 'image'

type DefaultValue = string | number | boolean | null

type Fields = {
   [key: string]:
      | [DefaultValue, ...Validator[]]
      | DefaultValue
      | FormControl<any>
}

export class FormControl<Form extends Fields> {
   protected tes: Form

   constructor(public form: Form) {
      Object.keys(form).forEach(key => {
         const field = this.field(form[key] as '', key)
         this[key] = field
      })
   }

   private boolean(key: string, value: boolean, validations: Validator[] = []) {
      const ref = React.createRef<any>()

      return {
         props: {
            ref,
            name: key,
            type: 'checkbox',
            defaultChecked: value
         },
         meta: {
            path: key,
            validations
         }
      }
   }

   private default<T>(key: string, value: T, validations: Validator[] = []) {
      const ref = React.createRef<any>()

      return {
         props: {
            ref,
            name: key,
            defaultValue: value
         },
         meta: {
            path: key,
            validations
         }
      }
   }

   private field(
      params: [DefaultValue, ...Validator[]] | DefaultValue,
      key: string
   ) {
      const value = Array.isArray(params) ? params[0] : params
      const validations = Array.isArray(params) ? params.slice(1) : []

      if (params instanceof FormControl) {
         return params
      }

      if (typeof value === 'boolean') {
         return this.boolean(key, value, validations as Validator[])
      }

      return this.default(key, value, validations as Validator[])
   }
}

export function useForm<T extends Fields>(formControl: FormControl<T>) {
   return { formControl }
}
