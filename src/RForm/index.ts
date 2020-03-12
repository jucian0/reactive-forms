import { useState, useEffect, useRef } from 'react';
import { fromEvent, Observable, from, BehaviorSubject } from 'rxjs'


const useFormControl = <T>(value: T, validations: Array<any>) => {

    const controlRef = useRef<HTMLInputElement>(null)
    const [control$, setControl] = useState<Observable<Event>>()
    const [error, setError] = useState()

    useEffect(() => {
        if (controlRef.current) {
            if (controlRef.current.value === null) {
                setControl(fromEvent(controlRef.current, 'input'))
            } else if ((controlRef as any).current.state) {
                setControl(new BehaviorSubject((controlRef as any).state) as Observable<Event>)
            }
        }
    }, [controlRef])

    // control$?.subscribe(
    //     (e: any) => {
    //         if (validations.length > 0) {

    //             const error = validations
    //                 .filter(validation => typeof validation === 'function')
    //                 .map(validation => validation(e.target.value))
    //                 .filter(validation => validation)

    //             if (error) {
    //                 setError(error[0])
    //             }
    //         }
    //     }
    // )

    return {
        value: control$,
        validations,
        props: {
            ref: controlRef,
        },
        error
    }
}


const useFormGroup = <T extends any>(formControls: T) => {

    const values: any = {}
    const errors: any = {}
    const props: any = {}

    Object.keys(formControls).forEach(key => {
        values[key] = formControls[key].value
        errors[key] = formControls[key].error
        props[key] = formControls[key].props
    })

    return {
        values,
        errors,
        props
    }
}



export { useFormControl, useFormGroup };
