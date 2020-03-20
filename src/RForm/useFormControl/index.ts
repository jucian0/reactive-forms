import { UseFormControl, UseFormControlReturn } from "./index.types"
import { useRef, useState, useEffect } from "react"
import { Observable, fromEvent } from "rxjs"


export const useFormControl = <Ref = HTMLInputElement, T extends UseFormControl<T['value']> = UseFormControl>(initialValue: T['value'], validations: T['validations']): UseFormControlReturn<Ref, T['value']> => {

   const controlRef = useRef<Ref>(null)
   const [control$, setControl] = useState<Observable<Event>>(new Observable())
   const [error, setError] = useState<string>()
   const [value, setValue] = useState<typeof initialValue>()

   useEffect(() => {
      if (controlRef.current) {
         setControl(fromEvent((controlRef as any).current, 'input'))
      }
   }, [controlRef])

   useEffect(() => {

      const errors = control$?.subscribe(
         e => {
            if (validations.length > 0) {
               const error = validations
                  .filter(validation => typeof validation === 'function')
                  .map(validation => validation((e as any).target?.value))
                  .filter(validation => validation)
               if (error[0]) {
                  setError(error[0])
               } else {
                  setError(undefined)
               }
            }
            if ((e as any).target.value !== undefined) {
               setValue((e as any).target.value)
            }
         }
      )

      return () => errors?.unsubscribe()

   }, [control$, validations])


   return {
      value$: control$,
      value: value,
      props: {
         ref: controlRef,
      },
      error
   }
}