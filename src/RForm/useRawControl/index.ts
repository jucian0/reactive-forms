import { UseRawControl, UseRawControlReturn } from "./index.types"
import { Observable, of } from "rxjs"
import { useRef, useState, useEffect } from "react"

export const useRawControl = <Ref = HTMLSelectElement, T extends UseRawControl<T['value']> = UseRawControl>(initialValue: T['value'], validations: T['validations']): UseRawControlReturn<Ref> => {
   const controlRef = useRef<Ref>(null)
   const [control$, setControl] = useState<Observable<any>>(new Observable())
   const [error, setError] = useState<string>()
   const [value, setValue] = useState<typeof initialValue>()

   useEffect(() => {

      const error = control$?.subscribe(
         e => {
            if (validations.length > 0) {
               const error = validations
                  .filter(validation => typeof validation === 'function')
                  .map(validation => {
                     if (e?.value) {
                        return validation(e.value)
                     }
                     return validation(e)
                  })
                  .filter(validation => validation)
               if (error[0]) {
                  setError(error[0])
               } else {
                  setError(undefined)
               }
            }

            if (e.value !== undefined) {
               setValue(e.value)
            }
         }
      )

      return () => error?.unsubscribe()

   }, [control$, error, validations])

   return {
      value$: control$,
      props: {
         ref: controlRef,
         onChange: (e: any) => setControl(of(e))
      },
      value,
      error
   }
}
